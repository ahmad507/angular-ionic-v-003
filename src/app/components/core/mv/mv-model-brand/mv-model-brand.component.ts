import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule, ModalController} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {DataServiceKendaraan} from "@src/app/components/core/mv/data/mv.data.service";
import {
  ModalMvModelBrandComponent
} from "@src/app/components/core/mv/mv-model-brand/modal-mv-model-brand/modal-mv-model-brand.component";
import {selectKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {Store} from "@ngrx/store";

@Component({
  standalone: true,
  imports:[CommonModule, FormsModule, IonicModule],
  selector: 'app-mv-model-brand',
  templateUrl: './mv-model-brand.component.html',
  styleUrls: ['./mv-model-brand.component.scss'],
})
export class MvModelBrandComponent  implements OnInit {
  @Input() iconLeft: string = 'ribbon';
  @Input() iconColorRight: string = 'primary';
  @Input() iconRight: string = 'caret-forward';

  selectedMVBrandModel: string =  'Merek - Model Kendaraan';
  listDataMerekKendaraan: any = [];
  private MV_TYPE: string = 'A';

  constructor(
    private store: Store,
    private modalController: ModalController,
    private dataServiceKendaraan: DataServiceKendaraan
    ) { }

  ngOnInit() {}

  async openModalBrand() {
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.MV_TYPE = res.vtype;
    })
    this.dataServiceKendaraan.getMerekModelKendaraan({ type: this.MV_TYPE }).pipe().subscribe((res)=>{
      const responseData = res.r_data;
      let arrDataMerek: any = [];
      responseData.forEach((res)=>{
        arrDataMerek.push({
          merk_code: res.merk_code,
          name: res.name,
          type: res.type
        });
      });
      this.listDataMerekKendaraan = arrDataMerek;
      this.openModalMvBrand(arrDataMerek);
    });
  }

  private async openModalMvBrand(arrDataMerek: any) {
    const modalMvModelBrand = await this.modalController.create({
      component: ModalMvModelBrandComponent,
      componentProps: {
        DataMerekKendaraan: arrDataMerek
      }
    });
    await modalMvModelBrand.present();
  }
}
