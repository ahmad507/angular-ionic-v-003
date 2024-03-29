import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CarInsuranceState,
  MvInfo,
  MvInfoDetail,
  MvRisk,
  MvValidator,
  RESPONSE_RISK,
} from '@src/app/pages/kendaraan/store-kendaraan/kendaraan.state';
import {
  resetCarInsuranceData,
  resetMvInfoDetailData, updateKendaraanData,
} from '@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions';
import { selectKendaraanData } from '@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector';
import {
  PopoverController,
  ToastController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { MvDataService } from '@src/app/pages/kendaraan/store-kendaraan/mv.data.service';
import { AccessoryService } from '@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.service';
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import { PopOverComponent } from '@src/app/components/utils/pop-over/pop-over.component';
import { MvRepository } from '@src/app/pages/kendaraan/class/mvRepository';
import { distinctUntilChanged } from 'rxjs/operators';
import { MvAccessoriesComponent } from '@src/app/components/core/mv/mv-accessories/mv-accessories/mv-accessories.component';
import { AccItems } from './store-kendaraan/store-kendaraan-aksesoris/acc.input.state';
import {
  selectAllAccessories
} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.selector";
@Component({
  selector: 'app-kendaraan',
  templateUrl: './kendaraan.page.html',
  styleUrls: ['./kendaraan.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KendaraanPage implements OnInit {
  @Input() mv_price: string = '0';
  @Input() mv_price_acc: string = '0';

  private destroy$: Subject<void> = new Subject<void>();
  mv_price_max: number = 0;
  inputSubject = new Subject<string>();
  isButtonDisabled: boolean = true;
  isCar: boolean = true;
  dataTempMvType: string = '';
  dataTempMvYear: number = 0;
  MV_INFO_DATA: any = [];
  constructor(
    private router: Router,
    private store: Store,
    private mvDataService: MvDataService,
    private accInputService: AccessoryService,
    private toastController: ToastController,
    private popOverController: PopoverController,
    private loadingController: LoadingController,
    private mvRepository: MvRepository,
    private cdRef: ChangeDetectorRef,
    private modalController: ModalController
  ) {
    this.checkPriceInput();
  }

  async ngOnInit() {
    this.isButtonDisabled = false;
    this.isButtonDisabled = false;
    this.mvRepository.getStoreMvData().subscribe((res) => {
      this.isCar = res.vtype === 'A';
    });
    this.mvRepository.getStoreMvData().subscribe((data) => {
      this.dataTempMvType = data.vtype;
      this.dataTempMvYear = data.vyear;
      this.mv_price = data.mainsi.toString();
      this.mv_price_acc = data.accesories_si.toLocaleString();
    });
  }

  async gotoHome() {
    this.store.dispatch(resetCarInsuranceData());
    this.store.dispatch(resetMvInfoDetailData());
    await this.router.navigate(['/main/home']);
  }

  async getDataNasabah($event: string) {
    this.updateKendaraanPayload('ctype', $event);
  }

  async getDataMvFunction($event: string) {
    this.updateKendaraanPayload('vfunction', $event);
  }

  async getDataMvType($event: string) {
    this.updateKendaraanPayload('vtype', $event);
    this.dataTempMvType = $event;
    this.mvRepository.getStoreMvData().subscribe((res) => {
      this.isCar = res.vtype === 'A';
    });
  }

  async getDataMvYear($event: number) {
    this.dataTempMvYear = $event;
    this.updateKendaraanPayload('vyear', $event);
  }

  async getDataMvLicense($event: any) {
    const dataLicense = [];
    dataLicense.push($event);
    dataLicense.forEach((res) => {
      this.updateKendaraanPayload('license', res.id);
      this.updateKendaraanPayload('license_region', res.text);
    });
  }

  async getDataMvMerekModel($event: any) {
    this.extractDataMv($event);
    const mvInfo = [];
    mvInfo.push({ ...$event });
    mvInfo.map((res) => {
      this.updateKendaraanPayload('vcode', res.vcode);
      this.updateKendaraanPayload('vmodel', res.unit_name);
      this.updateKendaraanPayload('vbrand', res.merek);
    });
  }

  async openAccModal() {
    const modalAccMv = await this.modalController.create({
      component: MvAccessoriesComponent,
      componentProps: {
        mv_price: this.mv_price,
      },
    });
    await modalAccMv.present();
    await modalAccMv.onDidDismiss().then((res) => {
      const totalHarga = res.data.reduce((total: any, res: AccItems) => total + res.harga, 0);
      this.mv_price_acc = totalHarga.toString().toLocaleString();
      const accItems: AccItems = res.data;
      const newData: Partial<CarInsuranceState> = {
        accesories_si: totalHarga,
        accesories_detail: [accItems]
      };
      this.store.dispatch(updateKendaraanData({ newData }));
      this.cdRef.markForCheck();
    });
  }

  async goToPopOver(event: any) {
    const popOver = await this.popOverController.create({
      component: PopOverComponent,
      alignment: 'end',
      event: event,
      cssClass: 'custom-pop-over',
      showBackdrop: false,
    });
    await popOver.present();
  }

  private extractDataMv($event: MvInfo) {
    const mainsi = parseFloat($event.mainsi.replace(/,/g, ''));
    const unit_price_max = mainsi + mainsi * 0.1;
    const unit_price_min = mainsi - mainsi * 0.1;
    this.mv_price_max = unit_price_max;
    this.mv_price = $event.mainsi;
    this.updateKendaraanPayload('mainsi', $event.mainsi);
    const dataCarInfo: MvInfoDetail = {
      ...$event,
      unit_price_max: unit_price_max,
      unit_price: mainsi.toLocaleString(),
      unit_price_min: unit_price_min,
    };
    this.updateMvInfoDetail('mainsi', dataCarInfo.mainsi);
    this.updateMvInfoDetail('merek', dataCarInfo.merek);
    this.updateMvInfoDetail('vcode', dataCarInfo.vcode);
    this.updateMvInfoDetail('unit_name', dataCarInfo.unit_name);
    this.updateMvInfoDetail('unit_price_max', dataCarInfo.unit_price_max);
    this.updateMvInfoDetail('unit_price', dataCarInfo.unit_price);
    this.updateMvInfoDetail('unit_price_min', dataCarInfo.unit_price_min);
  }

  private async checkLimitMvPrice(dataPrice: any) {
    let min_mv_price_temp: number = 0;
    let max_mv_price_temp: number = 0;
    let dataPriceMv = parseInt(dataPrice.replace(/,/g, ''), 10);
    this.MV_INFO_DATA.map((data: any) => {
      min_mv_price_temp = data.unit_price_min;
      max_mv_price_temp = data.unit_price_max;
    });
    if (dataPriceMv > max_mv_price_temp) {
      const message = 'Harga kendaraan melebihi limit maksimal';
      await this.toastWarning(message);
    } else if (min_mv_price_temp > dataPriceMv) {
      const message = 'Harga kendaraan kurang dari limit minimal';
      await this.toastWarning(message);
    } else {
      const message = 'Harga kendaraan melebihi limit maksimal';
      await this.toastWarning(message);
    }
  }

  private async toastWarning(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'custom-toast',
      position: 'top',
      duration: 2500,
      icon: 'warning',
    });
    await toast.present();
  }

  private checkMvParamRangePrice() {
    this.mvRepository.getStoreMvDetailData().subscribe((data) => {
      let temp: any[] = [];
      temp.push({ ...data });
      this.MV_INFO_DATA = temp;
    });

    this.mvRepository.getStoreMvData().subscribe((data) => {
      this.mv_price = data.mainsi.toString();
      this.mv_price_acc = data.accesories_si.toLocaleString();
    });
  }

  private checkValidationBeforeNext(validator: MvValidator): boolean {
    for (const key in validator) {
      if (validator.hasOwnProperty(key)) {
        const value = validator[key as keyof MvValidator];
        if (typeof value === 'string' && !value.trim()) {
          return false;
        }
      }
    }
    return true;
  }

  private async openModalMessage() {
    const message = 'Silahkan untuk melengkapi data terlebih dahulu';
    const imgSource = 'assets/danger.png';
    const btnText = 'Close';
    return this.mvRepository.openModalWarning(message, imgSource, btnText);
  }

  private async openModalRisk(r_data: MvRisk[]) {
    await this.mvRepository.openModalMainRisk(r_data, this.dataTempMvType);
  }

  private checkPriceInput() {
    this.inputSubject.pipe(debounceTime(750)).subscribe(async (value) => {
      await this.checkLimitMvPrice(value);
    });
  }

  checkMvPrice(mv_price: string) {
    const mv_temp_price = parseInt(mv_price);
    return mv_temp_price > 0;
  }

  deleteAccData() {
    this.updateKendaraanPayload('accesories_si', 0);
    this.updateKendaraanPayload('accesories_detail', []);
    this.accInputService.removeAccessory([]);
  }

  checkAccPrice(mv_price_acc: string) {
    const mv_temp_price_acc = parseInt(mv_price_acc);

    return mv_temp_price_acc > 0;
  }

  getYearPeriode($event: any) {
    const yearPeriodSelected: string = $event.detail.value;
    this.updateKendaraanPayload('year_period', yearPeriodSelected);
  }

  getDataMainRisk() {
    this.store
      .select(selectKendaraanData)
      .pipe(take(1))
      .subscribe(async (res) => {
        const validator: MvValidator = {
          ctype: res.ctype,
          license: res.license,
          license_region: res.license_region,
          vfunction: res.vfunction,
          vtype: res.vtype,
          vyear: res.vyear,
          vcode: res.vcode,
          vmodel: res.vmodel,
          vbrand: res.vbrand,
          year_period: res.year_period,
          mainsi: res.mainsi,
        };
        const validParam = this.checkValidationBeforeNext(validator);
        if (validParam) {
          const loading = await this.loadingController.create({
            spinner: 'circles',
          });
          await loading.present();
          this.mvDataService
            .mvMainRisk()
            .pipe(takeUntil(this.destroy$))
            .subscribe(async (res: RESPONSE_RISK) => {
              if (res.r_data.length > 0) {
                await loading.dismiss();
                await this.openModalRisk(res.r_data);
              }else {
                await loading.dismiss();
              }
            });
        } else {
          await this.openModalMessage();
        }
      });
  }

  checkYearAndType() {
    this.mvRepository
      .getStoreMvData()
      .pipe(
        distinctUntilChanged(
          (prev, curr) => prev.vtype === curr.vtype && prev.vyear === curr.vyear
        )
      )
      .subscribe((data) => {
        this.mv_price = data.mainsi.toString();
        this.dataTempMvType = data.vtype;
        this.dataTempMvYear = data.vyear;
      });
    return this.dataTempMvYear !== 0;
  }

  CheckParamMV() {
    return this.checkMvParamRangePrice();
  }

  updateMvInfoDetail(property: string, value: any) {
    this.mvDataService.updateMvInfoDetail(property, value);
    this.accInputService.deleteAccessory();
  }

  updateKendaraanPayload(property: string, value: any) {
    this.mvDataService.updateKendaraanPayload(property, value);
    this.accInputService.deleteAccessory();
  }

  checkInput($event: any) {
    const inputValue = $event.target.value;
    return this.validatePrice(inputValue);
  }

  validatePrice(unit_price: any) {
    this.inputSubject.next(unit_price);
    let dataPrice = parseInt(unit_price.replace(/,/g, ''), 10);
    this.mv_price = isNaN(dataPrice) ? unit_price : dataPrice.toLocaleString();
    this.updateKendaraanPayload('mainsi', this.mv_price);
    this.updateKendaraanPayload('accesories_si', this.mv_price_acc);
  }
}
