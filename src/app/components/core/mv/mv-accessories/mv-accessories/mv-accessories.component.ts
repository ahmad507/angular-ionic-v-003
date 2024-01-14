import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";
import {AccItems} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.state";
import {AccessoryService} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.service";
import {Store} from "@ngrx/store";
import {
  selectAllAccessories
} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.selector";
import {
  MvAccessoriesInputComponent
} from "@src/app/components/core/mv/mv-accessories-input/mv-accessories-input.component";
import {ListYear, MvListYear} from "@src/app/pages/policy/policy.page";
import {
  updateAccesoriesSi,
} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions";
import {MvDataService} from "@src/app/pages/kendaraan/store-kendaraan/mv.data.service";
import {take} from "rxjs";


@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ButtonComponent
  ],
  selector: 'app-mv-accessories',
  templateUrl: './mv-accessories.component.html',
  styleUrls: ['./mv-accessories.component.scss'],
})
export class MvAccessoriesComponent  implements OnInit {
  focused = false;
  searchParam = '';
  listMvYear: MvListYear = [];
  filteredList: ListYear[] = [];
  kacaFilm = false;
  soundSystem = false;
  isMerekFocused = false;
  isHargaFocused = false;
  inputMerekAcc = '';
  inputHargaAcc = '';
  accessories: AccItems[] = [];
  sum_acc_price: any;

  constructor(
    private modalController: ModalController,
    private mvDataService: MvDataService,  // Inject service
    private accessoryService: AccessoryService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.select(selectAllAccessories).subscribe((accessories) => {
      this.accessories = accessories;
      this.sum_acc_price = this.calculateTotalPrice(accessories);
    });
  }


  async openInputAccModal(acc_props: string) {
    const filteredAccessories = this.accessories.filter(item => item.name === acc_props);
    await this.presentInputAccModal(acc_props, filteredAccessories);
  }

  async presentInputAccModal(acc_props: string, accessoryDetails: AccItems[]) {
    const inputAccModal = await this.modalController.create({
      component: MvAccessoriesInputComponent,
      componentProps: {
        acc_props,
        inputMerekAcc: accessoryDetails.length > 0 ? accessoryDetails[0].merek : '',
        inputHargaAcc: accessoryDetails.length > 0 ? accessoryDetails[0].harga : '',
      },
      initialBreakpoint: 0.55,
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
    this.store.select(selectAllAccessories).pipe(take(1)).subscribe(async (accessories) => {
      this.accessories = accessories;
      this.sum_acc_price = this.calculateTotalPrice(accessories);
      this.accessoryService.updateAllAccessory(this.accessories);
      this.updateKendaraanPayload('accesories_si', this.sum_acc_price);
      this.updateKendaraanPayload('accesories_detail', accessories);
    });
    await this.modalController.dismiss(this.accessories, 'confirm');
  }

  openInputSoundSystem() {
    this.soundSystem = !this.soundSystem;
  }

  getAccessoryDetail(name: string): AccItems {
    return this.accessories.find(accessory => accessory.name === name) || { name: '', harga: 0, merek: '' };
  }

  iconColor(price: number) {
    return price > 0 ? 'success' : 'primary';
  }

  replaceUnderscoreWithSpace(accessory: string) {
    const stringWithSpaces = accessory.replace(/_/g, ' ');
    const words = stringWithSpaces.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
  }

  private calculateTotalPrice(accessories: AccItems[]) {
    if (accessories.length > 0) {
      return accessories.reduce((total, accessory) => total + accessory.harga, 0);
    } else {
      this.store.dispatch(updateAccesoriesSi({newAccesoriesSi:0}))
      return 0;
    }
  }

  async deleteAccItem(name: string) {
    await this.accessoryService.removeAccessory(name);
  }
}
