import {Component, Input, OnInit} from '@angular/core';
import {DetailMerek} from "@src/app/components/utils/merek-model-kendaraan/merek-model-kendaraan.component";
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {
  MvAccessoriesComponent
} from "@src/app/components/core/mv/mv-accessories/mv-accessories/mv-accessories.component";
import {MvModalService} from "@src/app/components/core/mv/mv-model-brand/services/mv.modal.service";
interface CarInfo {
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
  selector: 'app-mv-model-list',
  templateUrl: './mv-model-list.component.html',
  styleUrls: ['./mv-model-list.component.scss'],
})
export class MvModelListComponent  implements OnInit {
  @Input() DataarrDataMerekKendaraan : any = [];
  @Input() DataMerekKendaraan : string = '';
  @Input() DataMvYears : number = 0;
  @Input() DataMvType : string = '';
  DATA_LIST: DetailMerek[] = [];
  HARGA_KENDARAAN: any = '';
  HARGA_AKSESORIS: any = '';

  constructor(private modalController: ModalController,
              private mvModalService: MvModalService,
              private router: Router) { }

  ngOnInit() {
    this.DATA_LIST = this.DataarrDataMerekKendaraan.map((item:CarInfo)=>({
      ...item,
      unit_price_max: (parseInt(item.unit_price)) + (parseInt(item.unit_price) * 0.1),
      unit_price: parseInt(item.unit_price).toLocaleString(),
      unit_price_min: (parseInt(item.unit_price)) - (parseInt(item.unit_price) * 0.1),
    }));
  }

  dismissModal() {
    this.modalController.dismiss(null, 'cancel');
  }

  validateAndFormatPrice(event: any, index: number): void {
    const inputValue = event.target.value;
    this.DATA_LIST[index].unit_price = this.validatePrice(inputValue);
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

  async openModalAksesories(i: number) {
    const modalAccessories = await this.modalController.create({
      component: MvAccessoriesComponent
    });
    await modalAccessories.present();
    await modalAccessories.onDidDismiss().then((res)=>{
      console.log(res)
      this.DATA_LIST[i].acc_price = res.data;
    });
  }

  checkParamMVType(DataMvType: string) {
    if (DataMvType === 'A'){
      return 'block';
    } else{
      return 'hidden';
    }
  }

  async selectMvModel(i: number) {
    const dataMv = {
      mainsi: this.DATA_LIST[i].unit_price,
      vcode: this.DATA_LIST[i].model_number,
      accesories_si: this.DATA_LIST[i].acc_price,
      unit_name: this.DATA_LIST[i].unit_name,
      merek: this.DataMerekKendaraan
    }
    this.mvModalService.sendData(dataMv);
    await this.modalController.dismiss(dataMv, 'confirm');
  }
}


