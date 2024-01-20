import {Component, Input, OnInit} from '@angular/core';
import {DetailMerek} from "@src/app/components/utils/merek-model-kendaraan/merek-model-kendaraan.component";
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  MvAccessoriesComponent
} from "@src/app/components/core/mv/mv-accessories/mv-accessories/mv-accessories.component";
import {MvModalService} from "@src/app/components/core/mv/mv-model-brand/services/mv.modal.service";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";

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
    FormsModule,
    ButtonComponent
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

  focused: boolean = false;
  searchParam: string = '';
  filteredList: any[] = [];

  DATA_LIST: DetailMerek[] = [];
  HARGA_KENDARAAN: any = '';
  HARGA_AKSESORIS: any = '';

  constructor(private modalController: ModalController,
              private mvModalService: MvModalService,) { }

  ngOnInit() {
    this.DATA_LIST = this.DataarrDataMerekKendaraan.map((item:CarInfo)=>({
      ...item,
      unit_price_max: (parseInt(item.unit_price)) + (parseInt(item.unit_price) * 0.1),
      unit_price: parseInt(item.unit_price).toLocaleString(),
      unit_price_min: (parseInt(item.unit_price)) - (parseInt(item.unit_price) * 0.1),
    }));
    this.filter();
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

  async selectMvModel(item: any) {
    const dataMv = {
      vcode: item.model_number,
      unit_name: item.unit_name,
      merek: this.DataMerekKendaraan,
      unit_price_max: item.unit_price_max,
      mainsi: item.unit_price,
      unit_price_min: item.unit_price_min
    }
    this.mvModalService.sendData(dataMv);
    await this.modalController.dismiss(dataMv, 'confirm');
  }



  filter() {
    this.filteredList = this.DATA_LIST.filter((item:any) => item.unit_name.toString().toLowerCase().includes(this.searchParam.toLowerCase()));
  }

  onBlur(event: any){
    const value = event.target.value;
    if(!value){
      this.focused = false;
    }
  }
}


