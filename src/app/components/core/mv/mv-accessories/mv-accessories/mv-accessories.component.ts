import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@src/app/components/core/buttons/button/button.component';
import { AccItems } from '@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.state';
import { AccessoryService } from '@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.service';
import { Store } from '@ngrx/store';
import { selectAllAccessories } from '@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.selector';
import { MvAccessoriesInputComponent } from '@src/app/components/core/mv/mv-accessories-input/mv-accessories-input.component';
import {updateAccesoriesSi, updateKendaraanData} from '@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions';
import { MvDataService } from '@src/app/pages/kendaraan/store-kendaraan/mv.data.service';
import { take } from 'rxjs';
import { HomePageModule } from '@src/app/pages/home/home.module';
import { SharedDirectivesModule } from '@src/app/directives/shared-directives.module';
import { MvModalComponent } from '@src/app/components/core/mv/mv-modal/mv-modal.component';
import {CarInsuranceState} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ButtonComponent,
    HomePageModule,
    SharedDirectivesModule,
  ],
  selector: 'app-mv-accessories',
  templateUrl: './mv-accessories.component.html',
  styleUrls: ['./mv-accessories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MvAccessoriesComponent implements OnInit {
  @Input() mv_price: any = '';
  focused = false;
  searchParam = '';
  kacaFilm = false;
  isMerekFocused = false;
  isHargaFocused = false;
  inputMerekAcc = '';
  inputHargaAcc = '';
  accessories: AccItems[] = [];
  sum_acc_price: any;
  limit_acc: number = 0;

  constructor(
    private modalController: ModalController,
    private mvDataService: MvDataService, // Inject service
    private accessoryService: AccessoryService,
    private store: Store,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getLimitAccPrice();
    this.store.select(selectAllAccessories).subscribe((accessories) => {
      this.accessories = accessories;
      this.sum_acc_price = this.calculateTotalPrice(accessories);
      this.cdRef.markForCheck();
    });
  }

  private getLimitAccPrice() {
    const mv_limit_acc = parseFloat(this.mv_price.replace(/,/g, ''));
    const discountPercentage = 0.1; // 10%
    this.limit_acc = mv_limit_acc * discountPercentage;
  }

  async openInputAccModal(acc_props: string) {
    const filteredAccessories = this.accessories.filter(
      (item) => item.name === acc_props
    );
    await this.presentInputAccModal(acc_props, filteredAccessories);
  }

  async presentInputAccModal(acc_props: string, accessoryDetails: AccItems[]) {
    const inputAccModal = await this.modalController.create({
      component: MvAccessoriesInputComponent,
      componentProps: {
        acc_props,
        inputMerekAcc:
          accessoryDetails.length > 0 ? accessoryDetails[0].merek : '',
        inputHargaAcc:
          accessoryDetails.length > 0 ? accessoryDetails[0].harga : '',
      },
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.55, 0.5, 0.75],
      backdropDismiss: false,
      cssClass: 'custom-modal-class',
    });
    await inputAccModal.present();

  }

  openInputKacaFilm() {
    this.kacaFilm = !this.kacaFilm;
  }

  iconName(price: number) {
    return price > 0 ? 'checkmark-circle' : 'caret-forward';
  }

  onFocus(input: string): void {
    this.isMerekFocused = input === 'merek';
    this.isHargaFocused = input === 'harga';
  }

  onBlur(input: string): void {
    this.isMerekFocused = input === 'merek' && this.inputMerekAcc !== '';
    this.isHargaFocused = input === 'harga' && this.inputHargaAcc !== '';
  }

  updateKendaraanPayload(property: string, value: any) {
    this.mvDataService.updateKendaraanPayload(property, value);
  }

  async handleClick() {
    this.store
      .select(selectAllAccessories)
      .pipe(take(1))
      .subscribe(async (accessories) => {
        this.accessories = accessories;
        this.sum_acc_price = this.calculateTotalPrice(accessories);
        this.accessoryService.updateAllAccessory(this.accessories);
        if (this.sum_acc_price > this.limit_acc) {
          await this.showOverLimitWarning();
        } else {
          const newData: Partial<CarInsuranceState> = {
            accesories_si: this.sum_acc_price,
            accesories_detail: [...accessories]
          };
          this.store.dispatch(updateKendaraanData({ newData }));
          await this.modalController.dismiss(this.accessories, 'confirm');
        }
      });
  }

  getAccessoryDetail(name: string): AccItems {
    return (
      this.accessories.find((accessory) => accessory.name === name) || {
        name: '',
        harga: 0,
        merek: '',
      }
    );
  }

  iconColor(price: number) {
    return price > 0 ? 'success' : 'primary';
  }

  replaceUnderscoreWithSpace(accessory: string) {
    const stringWithSpaces = accessory.replace(/_/g, ' ');
    const words = stringWithSpaces.split(' ');
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return capitalizedWords.join(' ');
  }

  private calculateTotalPrice(accessories: AccItems[]) {
    if (accessories.length > 0) {
      return accessories.reduce(
        (total, accessory) => total + accessory.harga,
        0
      );
    } else {
      this.store.dispatch(updateAccesoriesSi({ newAccesoriesSi: 0 }));
      return 0;
    }
  }

  async deleteAccItem(name: string) {
    await this.accessoryService.removeAccessory(name);
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  private async showOverLimitWarning() {
    const modalWarning = await this.modalController.create({
      component: MvModalComponent,
      componentProps: {
        message: 'Total harga melebihi batas minimal 10% dari harga kendaraan',
        imgSource: 'assets/undraw_Warning_re_eoyh.png',
        btnText: 'Ok, Mengerti...',
      },
      cssClass: 'custom-modal',
      backdropDismiss: false,
      showBackdrop: true,
      initialBreakpoint: 1,
      backdropBreakpoint: 1,
    });
    await modalWarning.present();
  }
}
