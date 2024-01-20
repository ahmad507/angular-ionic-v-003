import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import { AccessoryService } from '@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputComponent} from "@src/app/components/core/input/input/input.component";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";

@Component({
  selector: 'app-mv-accessories-input',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './mv-accessories-input.component.html',
  styleUrls: ['./mv-accessories-input.component.scss'],
})
export class MvAccessoriesInputComponent implements OnInit {
  @Input() acc_props: any;
  @Output() dataChanged = new EventEmitter<any>();

  inputMerekAcc: string = '';
  inputHargaAcc: string = '';
  isMerekFocused = false;
  isHargaFocused = false;

  accessories$ = this.accessoryService.getAllAccessories();
  isNumeric: boolean = false;

  constructor(
    private modalController: ModalController,
    private accessoryService: AccessoryService
  ) {
    this.isNumeric = true;
  }

  ngOnInit() {}

  handleClick(acc_props: string) {
    const integerValue = parseInt(this.inputHargaAcc.replace(/[^0-9]/g, ''), 10);
    const data = {
      name: acc_props,
      harga: integerValue,
      merek: this.inputMerekAcc,
    };
    console.log('DATA', data);
    this.accessoryService.addAccessory(data);
    this.resetInputs();
    this.dataChanged.emit(data);
    this.modalController.dismiss();
  }

  onFocus(input: string): void {
    this.isMerekFocused = input === 'merek';
    this.isHargaFocused = input === 'harga';
  }

  onBlur(input: string): void {
    this.isMerekFocused = input === 'merek' && this.inputMerekAcc !== '';
    this.isHargaFocused = input === 'harga' && this.inputHargaAcc !== '';
  }

  private resetInputs() {
    this.inputMerekAcc = '';
    this.inputHargaAcc = '';
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  replaceUnderscoreWithSpace(accessory: string) {
    const stringWithSpaces = accessory.replace(/_/g, ' ');
    const words = stringWithSpaces.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
  }

  getFormatInput(inputHargaAcc: string) {
    console.log(inputHargaAcc)
  }
}
