import {Component, Input, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

export interface DetailMerek {
  model_number: string;
  merk_code: string;
  unit_name: string;
  unit_year: string;
  unit_price_max: string;
  unit_price: string;
  unit_price_min: string;
  unit_type: string;
  acc_price?: number; // Properti acc_price bersifat opsional (?)
}

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  selector: 'app-merek-model-kendaraan',
  templateUrl: './merek-model-kendaraan.component.html',
  styleUrls: ['./merek-model-kendaraan.component.scss'],
})
export class MerekModelKendaraanComponent  implements OnInit {
  @Input() DataarrDataMerekKendaraan : any = [];
  @Input() DataMerekKendaraan : string = '';
  DATA_LIST: DetailMerek[] = [];
  HARGA_KENDARAAN: any = '';

  constructor(
    private modalController : ModalController
  ) { }

  ngOnInit() {
    this.DATA_LIST = this.DataarrDataMerekKendaraan.map((item:any)=>({
      ...item,
      unit_price_max: (parseInt(item.unit_price)) + (parseInt(item.unit_price) * 0.1),
      unit_price: parseInt(item.unit_price).toLocaleString(),
      unit_price_min: (parseInt(item.unit_price)) - (parseInt(item.unit_price) * 0.1),
    }))
  }

  dismissModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  validatePrice(unit_price: any) {
    const dataPrice = parseInt(unit_price);
    if (isNaN(dataPrice)) {
      return unit_price;  // atau nilai default yang sesuai dengan aplikasi Anda
    }
    return dataPrice.toLocaleString();
  }

  validateAndFormatPrice(event: any, index: number): void {
    const inputValue = event.target.value;
    this.DATA_LIST[index].unit_price = this.validatePrice(inputValue);
  }
}
