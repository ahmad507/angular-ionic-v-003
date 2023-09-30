import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ModalMvTypeComponent} from "@src/app/components/core/mv/mv-type/modal-mv-type/modal-mv-type.component";

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

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async openModalMVType() {
    const modalMvType = await this.modalController.create({
      component: ModalMvTypeComponent
    });
    await modalMvType.present();
    await modalMvType.onDidDismiss().then((response)=>{
      this.setDataMvType.emit(response.data);
      switch (response.data){
        case 'A':
          this.selectedMVType = 'Sedan, City Car, Jeep, Mini Bus';
          this.iconLeft = 'car';
          this.iconRight = 'checkmark-circle-sharp';
          this.iconColorRight = 'success';
          break;
        case 'B':
          this.selectedMVType = 'Bus';
          this.iconLeft = 'bus';
          this.iconRight = 'checkmark-circle-sharp';
          this.iconColorRight = 'success';
          break;
        case 'D':
          this.selectedMVType = 'Sepeda Motor';
          this.iconLeft = 'bicycle';
          this.iconRight = 'checkmark-circle-sharp';
          this.iconColorRight = 'success';
          break;
        default:
      }
    })
  }
}
