import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule, ModalController} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {DataServiceKendaraan} from "@src/app/components/core/mv/data/mv.data.service";
import {
  ModalMvModelBrandComponent
} from "@src/app/components/core/mv/mv-model-brand/modal-mv-model-brand/modal-mv-model-brand.component";
import {
  selectKendaraanDataVtype
} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {select, Store} from "@ngrx/store";
import {take} from "rxjs";
import {MvModalService} from "@src/app/components/core/mv/mv-model-brand/services/mv.modal.service";

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

  @Output() setDataMvDetail = new EventEmitter<object>();

  selectedMVBrandModel: string =  'Merek - Model Kendaraan';
  listDataMerekKendaraan: any = [];
  private MV_TYPE: string = 'A';

  constructor(
    private store: Store,
    private modalController: ModalController,
    private dataServiceKendaraan: DataServiceKendaraan,
    private mvModalService: MvModalService,
    ) { this.getDataMvSelected() }

  ngOnInit() {}

  async openModalBrand() {
    this.store.pipe(select(selectKendaraanDataVtype), take(1)).subscribe((vtype) => {
      this.MV_TYPE = vtype;
    });
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

  private getDataMvSelected() {
    this.mvModalService.getData().subscribe((res)=>{
      this.setDataMvDetail.emit(res);
      let mvInfo = [];
      mvInfo.push({...res});
      mvInfo.map((res)=>{
        this.selectedMVBrandModel = `${res.merek} - ${res.unit_name}`
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
      })
    })
  }
}
