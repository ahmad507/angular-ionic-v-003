import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  ModalMvFunctionComponent
} from "@src/app/components/core/mv/mv-function/modal-mv-function/modal-mv-function.component";

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  selector: 'app-mv-function',
  templateUrl: './mv-function.component.html',
  styleUrls: ['./mv-function.component.scss'],
})
export class MvFunctionComponent  implements OnInit {
  @Input() iconLeft: string = 'key';
  @Input() iconColorRight: string = 'primary';
  @Input() iconRight: string = 'caret-forward';
  @Input() mvFunction: string = 'P';

  @Output() setDataMvFunction = new EventEmitter<string>();

  selectedMVFunction: string = 'Penggunaan Kendaraan';

  constructor(private modalController : ModalController) { }

  ngOnInit() {}

  async openModalMVFunction() {
    const modalMvFunction = await this.modalController.create({
      component: ModalMvFunctionComponent
    });
    await modalMvFunction.present();
    await modalMvFunction.onDidDismiss().then((response)=>{
      this.setDataMvFunction.emit(response.data);
      if(response.data === 'P'){
        this.selectedMVFunction = 'Pribadi / Dinas';
        this.iconLeft = 'key'
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
      }else {
        this.selectedMVFunction = 'Disewakan';
        this.iconLeft = 'calculator';
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
      }
    })
  }
}
