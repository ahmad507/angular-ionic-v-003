import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { MvAccessoriesInputComponent } from "@src/app/components/core/mv/mv-accessories-input/mv-accessories-input.component";
import { AccessoryService } from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.service";
import { Store } from "@ngrx/store";
import { selectAllAccessories } from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.selector";
import { AccItems } from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.state";
import { take } from "rxjs";

export type MvListYear = ListYear[];

export interface ListYear {
  id: number;
  text: number;
}

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
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
  // accessories$: Observable<AccItems[]> = this.accessoryService.getAllAccessories();
  accessories: AccItems[] = [];

  constructor(
    private modalController: ModalController,
    private accessoryService: AccessoryService,
    private store: Store
  ) {}

  ngOnInit() {
    this.callApiForMvYear();
    this.filter();
    this.store.select(selectAllAccessories).subscribe(accessories => this.accessories = accessories);
  }

  private callApiForMvYear() {
    const dateNow = new Date();
    const yearNow = dateNow.getFullYear();
    this.listMvYear = Array.from({ length: 16 }, (_, i) => ({ id: yearNow - i, text: yearNow - i }));
  }

  filter() {
    this.filteredList = this.listMvYear.filter(item => item.text.toString().toLowerCase().includes(this.searchParam.toLowerCase()));
  }

  async handleCheck($event: any, item: string) {
    const checkedStatus = $event.detail.checked;
    if (checkedStatus) {
      await this.openInputAccModal("kaca-film");
    }
  }

  async openInputAccModal(acc_props: string) {
    const filteredAccessories = this.accessories.filter(item => item.name === acc_props);
    this.presentInputAccModal(acc_props, filteredAccessories);
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

  handleClick() {
    // this.accessories$.subscribe(res => console.log(res));
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

  dismissModal() {
    // this.modalController.dismiss();
  }
}
