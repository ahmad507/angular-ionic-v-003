import {Component, Input, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {selectKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {Store} from "@ngrx/store";
import {DataMerekKendaraan} from "@src/app/components/utils/searchable-select/shared/data.service";
import {DataServiceKendaraan} from "@src/app/components/core/mv/data/mv.data.service";
import {
  MerekModelKendaraanComponent
} from "@src/app/components/utils/merek-model-kendaraan/merek-model-kendaraan.component";
import {MvModelListComponent} from "@src/app/components/core/mv/mv-model-brand/mv-model-list/mv-model-list.component";

export interface Mv_Brand {
  merk_code: string
  name: string
  type: string
}

@Component({
  standalone: true,
  selector: 'app-modal-mv-model-brand',
  templateUrl: './modal-mv-model-brand.component.html',
  styleUrls: ['./modal-mv-model-brand.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ModalMvModelBrandComponent  implements OnInit {
  selectedMvModelBrand: string = '';
  @Input() DataMerekKendaraan : any = [];

  constructor(
    private dataServiceKendaraan: DataServiceKendaraan,
    private modalController: ModalController,
    private store: Store) { }

  ngOnInit() {
  }

  async dismissModal() {
    await this.modalController.dismiss(this.selectedMvModelBrand, 'confirm');
  }

  getDataMvModel(item: Mv_Brand) {
    let mvYears: number = 0;
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      mvYears = res.vyear
      const params = {
        unit_type: res.vtype,
        merk_code: item.merk_code,
        unit_year: res.vyear,
      };
      this.dataServiceKendaraan.getMerekModelKendaraanV2(params).subscribe((res) => {
        const responseData: DataMerekKendaraan[] = res.r_data;
        let arrDataMerekKendaraan: any = [];
        let merekKendaraan: string = '';
        responseData.forEach((detail) => {
          merekKendaraan = detail.merk
          arrDataMerekKendaraan = detail.model
        });
        this.showModalListMerekModel(merekKendaraan, arrDataMerekKendaraan, mvYears);
      });
    });
  }

  private async showModalListMerekModel(merekKendaraan: string, arrDataMerekKendaraan: any, mvYears: number) {
    const modal = await this.modalController.create({
      component: MvModelListComponent,
      componentProps: {
        DataMerekKendaraan: merekKendaraan,
        DataMvYears: mvYears,
        DataarrDataMerekKendaraan: arrDataMerekKendaraan,
      }
    });
    await modal.present();
  }
}
