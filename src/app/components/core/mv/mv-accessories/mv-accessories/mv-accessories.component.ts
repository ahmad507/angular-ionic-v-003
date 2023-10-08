import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";

interface AccItem {
  id: number;
  price: string;
}

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
  DATA_LIST: any = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const acc_item = [
      {id:0, price:"0"},
      {id:1, price:"0"}
    ];
    this.DATA_LIST = acc_item;
  }

  dismissModal() {
    this.modalController.dismiss(null, 'confirm');
  }

  validateAndFormatPrice(event: any, index: number): void {
    const inputValue = event.target.value;
    this.DATA_LIST[index].price = this.validatePrice(inputValue);
  }

  validatePrice(unit_price: any) {
    const dataPrice = parseInt(unit_price.replace(/,/g, ''), 10);
    if (isNaN(dataPrice)) {
      return unit_price;
    }
    const maxSafeInteger = Number.MAX_SAFE_INTEGER;
    if (dataPrice > maxSafeInteger) {
      return "Value exceeds maximum allowed";
    }
    return dataPrice.toLocaleString();
  }

  async getDataAccessories(LIST_ITEM: any) {
    const result: number = this.convertAndSumPrices(LIST_ITEM);
    await this.modalController.dismiss(result, 'confirm');
  }

  private convertAndSumPrices(LIST_ITEM: any) {
    let total_price: number = 0;
    LIST_ITEM.forEach((item:AccItem) => {
      const numericPrice: number = parseInt(item.price.replace(/,/g, ''), 10);
      total_price += numericPrice;
    });
    return total_price;
  }
}
