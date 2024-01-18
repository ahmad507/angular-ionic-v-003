import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { informasiNasabah, informasiKendaraan } from "./data/data.simulasi";
import {Store} from "@ngrx/store";
import {MvInfoDetail} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";
import {
  resetCarInsuranceData, resetMvInfoDetailData
} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions";
import {selectKendaraanData, selectMvInfoDetailData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {ModalController, ToastController} from "@ionic/angular";
import {
  MvAccessoriesComponent
} from "@src/app/components/core/mv/mv-accessories/mv-accessories/mv-accessories.component";
import {MvDataService} from "@src/app/pages/kendaraan/store-kendaraan/mv.data.service";
import {AccessoryService} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.service";
import {debounceTime, Subject} from "rxjs";

export interface MvInfo {
  mainsi: string;
  vcode: string;
  unit_name: string;
  merek: string;
}

@Component({
  selector: 'app-kendaraan',
  templateUrl: './kendaraan.page.html',
  styleUrls: ['./kendaraan.page.scss'],
})
export class KendaraanPage implements OnInit {
  @Input() mv_price: string = '0';
  @Input() mv_price_acc: string = '0';


  inputDetail: any = informasiNasabah;
  inputDetail_2: any = informasiKendaraan;
  TIPE_NASABAH: string = '';
  PENGGUNAAN_KENDARAAN: string = '';
  JENIS_KENDARAAN: string = '';
  TAHUN_KENDARAAN: string = '';
  KODE_PLAT_KENDARAAN: string = '';
  MV_TYPE: string = '';
  MV_YEAR: number = 0;
  MV_INFO_DATA: any = [];
  MV_CODE: string = '';
  private mv_price_max: number = 0;
  private mv_price_min: number = 0;
  private inputSubject = new Subject<string>();
  isButtonDisabled: boolean = true;
  isMVCAR: boolean = true;
  dataTempMvType: string = '';
  dataTempMvYear: number = 0;



  constructor(
    private router : Router,
    private store : Store,
    private modalController : ModalController,
    private mvDataService: MvDataService,
    private accInputService: AccessoryService,
    private toastController: ToastController,
  ) {
    this.inputSubject.pipe(debounceTime(750)).subscribe((value) => {
      this.checkLimitMvPrice(value);
    });
  }

  ngOnInit() {
    this.isButtonDisabled = false;
    this.isButtonDisabled = false;
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.dataTempMvType = res.vtype;
      this.dataTempMvYear = res.vyear;
    });
  }
  async gotoHome() {
    this.store.dispatch(resetCarInsuranceData());
    this.store.dispatch(resetMvInfoDetailData());
    await this.router.navigate(['/main/home']);
  }

  updateMvInfoDetail(property: string, value: any) {
    this.mvDataService.updateMvInfoDetail(property, value);
    this.accInputService.deleteAccessory();
  }

  updateKendaraanPayload(property: string, value: any) {
    this.mvDataService.updateKendaraanPayload(property, value);
    this.accInputService.deleteAccessory();
  }

  async getDataNasabah($event: string) {
    this.updateKendaraanPayload('ctype', $event);
  }

  async getDataMvFunction($event: string) {
    this.updateKendaraanPayload('vfunction', $event);
  }

  async getDataMvType($event: string) {
    this.updateKendaraanPayload('vtype', $event);
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.dataTempMvType = res.vtype;
      this.isMVCAR = this.dataTempMvType === 'A';
    })
  }

  async getDataMvYear($event: number) {
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.dataTempMvYear = res.vyear;
    })
    this.updateKendaraanPayload('vyear', $event);
  }

  async getDataMvLicense($event: any) {
    const dataLicense = [];
    dataLicense.push($event);
    dataLicense.forEach((res)=>{
      this.updateKendaraanPayload('license', res.id);
      this.updateKendaraanPayload('license_region', res.text);
    })
  }

  async getDataMvMerekModel($event: any) {
    this.extractDataMv($event);
    const mvInfo = [];
    mvInfo.push({...$event});
    mvInfo.map((res)=>{
      this.updateKendaraanPayload('vcode', res.vcode);
      this.updateKendaraanPayload('vmodel', res.unit_name);
      this.updateKendaraanPayload('vbrand', res.merek);
    });
  }

  CheckParamMV() {
    this.store.select(selectMvInfoDetailData).pipe().subscribe((res)=>{
      let temp : any = [];
      temp.push({...res});
      this.MV_INFO_DATA = temp;
    });
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.mv_price = (res.mainsi).toString();
      this.mv_price_acc = (res.accesories_si).toLocaleString();
    })
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
  }

  private extractDataMv($event: any) {
    const dataCarinfoTemp = [];
    dataCarinfoTemp.push($event);
    const dataCarInfo = dataCarinfoTemp.map((item: MvInfo) => {
      const mainsi = parseFloat(item.mainsi.replace(/,/g, ''));
      const unit_price_max = mainsi + (mainsi * 0.1);
      this.mv_price_max = unit_price_max;
      const unit_price = mainsi.toLocaleString();
      this.mv_price = (item.mainsi);
      this.updateKendaraanPayload('mainsi', item.mainsi);
      const unit_price_min = mainsi - (mainsi * 0.1);
      this.mv_price_min = unit_price_min;
      return {
        ...item,
        unit_price_max: unit_price_max,
        unit_price: unit_price,
        unit_price_min: unit_price_min,
      };
    });

    dataCarInfo.forEach((res:MvInfoDetail)=>{
      this.updateMvInfoDetail('mainsi', res.mainsi);
      this.updateMvInfoDetail('merek', res.merek);
      this.updateMvInfoDetail('vcode', res.vcode);
      this.updateMvInfoDetail('unit_name', res.unit_name);
      this.updateMvInfoDetail('unit_price_max', res.unit_price_max);
      this.updateMvInfoDetail('unit_price', res.unit_price);
      this.updateMvInfoDetail('unit_price_min', res.unit_price_min);
    });

  }

  async openAccModal() {
    const modalAccMv = await this.modalController.create({
      component: MvAccessoriesComponent,
      componentProps:{
        mv_price: this.mv_price
      }
    });
    await modalAccMv.present();
  }

  private checkLimitMvPrice(dataPrice: any) {
    let min_mv_price_temp : number = 0;
    let max_mv_price_temp : number = 0;
    let mv_price_temp : number = 0;
    let dataPriceMv = parseInt(dataPrice.replace(/,/g, ''), 10);
    this.MV_INFO_DATA.map((data:any)=>{
      min_mv_price_temp = data.unit_price_min;
      max_mv_price_temp = data.unit_price_max;
      mv_price_temp = parseInt(data.unit_price.replace(/,/g, ''), 10);
    })
    if (dataPriceMv > max_mv_price_temp){
      const message = 'Harga kendaraan melebihi limit maksimal';
      this.toastWarning(message)
    }else if (min_mv_price_temp > dataPriceMv){
      const message = 'Harga kendaraan kurang dari limit minimal';
      this.toastWarning(message)
      console.log('Masuk Under MIN')
    } else if (dataPrice === 0){
      console.log('not null')
    }
  }

  private async toastWarning(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'custom-toast',
      position: 'top',
      duration: 2500,
      icon: 'warning',
    })
    await toast.present();
  }
}
