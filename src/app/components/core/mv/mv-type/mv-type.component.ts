import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalMvTypeComponent} from "@src/app/components/core/mv/mv-type/modal-mv-type/modal-mv-type.component";
import {selectKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-mv-type',
  templateUrl: './mv-type.component.html',
  styleUrls: ['./mv-type.component.scss'],
})
export class MvTypeComponent  implements OnInit {
  @Input() iconLeft: string = 'car';
  @Input() iconColorRight: string = 'primary';
  @Input() iconRight: string = 'caret-forward';

  @Output() setDataMvType = new EventEmitter<string>();


  selectedMVType: string = 'Jenis Kendaraan';
  private responseDataTemp: string = '';

  constructor(
    private modalController : ModalController,
    private store : Store,
  ) { }

  ngOnInit() {
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.responseDataTemp = res.vtype;
      this.checkSelectedMvType(this.responseDataTemp);
    })
  }

  async openModalMVType() {
    const modalMvType = await this.modalController.create({
      component: ModalMvTypeComponent
    });
    await modalMvType.present();
    await modalMvType.onDidDismiss().then((response)=>{
      const responseDataTemp: string = response.data || '';
      if (responseDataTemp === '') {
        this.checkSelectedMvType(this.responseDataTemp || '');
      } else {
        this.setDataMvType.emit(response.data);
        this.checkSelectedMvType(responseDataTemp);
      }
    })
  }

  private checkSelectedMvType(responseDataTemp: string) {
    switch (true){
      case responseDataTemp === '':
        this.selectedMVType = 'Jenis Kendaraan';
        this.iconLeft = 'car';
        this.iconRight = 'caret-forward';
        this.iconColorRight = 'primary';
        break;
      case responseDataTemp === 'A':
        this.selectedMVType = 'Sedan, City Car, Jeep, Mini Bus';
        this.iconLeft = 'car';
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
        break;
      case responseDataTemp === 'B':
        this.selectedMVType = 'Bus';
        this.iconLeft = 'bus';
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
        break;
      case responseDataTemp === 'D':
        this.selectedMVType = 'Sepeda Motor';
        this.iconLeft = 'bicycle';
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
        break;
      default:
        this.selectedMVType = 'Sedan, City Car, Jeep, Mini Bus';
        this.iconLeft = 'car';
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
        break;
    }
  }
}
