import {Component, Input, OnInit} from '@angular/core';
import {DetailMerek} from "@src/app/components/utils/merek-model-kendaraan/merek-model-kendaraan.component";
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  selector: 'app-mv-model-list',
  templateUrl: './mv-model-list.component.html',
  styleUrls: ['./mv-model-list.component.scss'],
})
export class MvModelListComponent  implements OnInit {
  @Input() DataarrDataMerekKendaraan : any = [];
  @Input() DataMerekKendaraan : string = '';
  @Input() DataMvYears : number = 0;
  DATA_LIST: DetailMerek[] = [];
  HARGA_KENDARAAN: any = '';

  constructor(private modalController : ModalController) { }

  ngOnInit() {
    this.DATA_LIST = this.DataarrDataMerekKendaraan.map((item:any)=>({
      ...item,
      unit_price_max: (parseInt(item.unit_price)) + (parseInt(item.unit_price) * 0.1),
      unit_price: parseInt(item.unit_price).toLocaleString(),
      unit_price_min: (parseInt(item.unit_price)) - (parseInt(item.unit_price) * 0.1),
    }))
    console.log(this.HARGA_KENDARAAN);
  }

  dismissModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  validateAndFormatPrice(event: any, index: number): void {
    const inputValue = event.target.value;
    this.DATA_LIST[index].unit_price = this.validatePrice(inputValue);
    console.log('D', this.DATA_LIST[index].unit_price);
  }

  validatePrice(unit_price: any) {
    const dataPrice = parseInt(unit_price.replace(/,/g, ''), 10); // Hapus semua koma dan ubah menjadi angka
    if (isNaN(dataPrice)) {
      return unit_price;
    }

    // Handle the case where the number exceeds the maximum safe integer
    const maxSafeInteger = Number.MAX_SAFE_INTEGER;
    if (dataPrice > maxSafeInteger) {
      return "Value exceeds maximum allowed";
    }

    return dataPrice.toLocaleString(); // Menambahkan koma ribuan kembali
  }
}
