import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  selectKendaraanDataVTypeVYear
} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {Store} from "@ngrx/store";
import {DataMerekKendaraan} from "@src/app/components/utils/searchable-select/shared/data.service";
import {DataServiceKendaraan} from "@src/app/components/core/mv/data/mv.data.service";
import {MvModelListComponent} from "@src/app/components/core/mv/mv-model-brand/mv-model-list/mv-model-list.component";
import {take} from "rxjs";

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
    this.store.select(selectKendaraanDataVTypeVYear).pipe(take(1)).subscribe((res)=>{
      const params = {
        unit_type: res.mv_type,
        merk_code: item.merk_code,
        unit_year: res.mv_year,
      };
      this.dataServiceKendaraan.getMerekModelKendaraanV2(params).subscribe( (res) => {
        const responseData: DataMerekKendaraan[] = res.r_data;
        let arrDataMerekKendaraan: any = [];
        let merekKendaraan: string = '';
        responseData.forEach((detail) => {
          merekKendaraan = detail.merk
          arrDataMerekKendaraan = detail.model
        });
        this.showModalListMerekModel(merekKendaraan, arrDataMerekKendaraan, params.unit_year, params.unit_type);
        this.dismissModal();
      });
    });
  }

  private async showModalListMerekModel(merekKendaraan: string, arrDataMerekKendaraan: any, mvYears: number, mvType: string) {
    const modalListMvBrand = await this.modalController.create({
      component: MvModelListComponent,
      componentProps: {
        DataMerekKendaraan: merekKendaraan,
        DataMvYears: mvYears,
        DataMvType: mvType,
        DataarrDataMerekKendaraan: arrDataMerekKendaraan,
      }
    });
    await modalListMvBrand.present();
  }
}
