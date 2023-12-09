import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  ModalMvFunctionComponent
} from "@src/app/components/core/mv/mv-function/modal-mv-function/modal-mv-function.component";
import {selectKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {Store} from "@ngrx/store";

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
  private responseDataTemp: string = '';

  constructor(
    private modalController : ModalController,
    private store : Store,
  ) { }

  ngOnInit() {
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.responseDataTemp = res.vfunction;
      this.checkSelectedMvFunction(this.responseDataTemp);
    })
  }

  async openModalMVFunction() {
    const modalMvFunction = await this.modalController.create({
      component: ModalMvFunctionComponent
    });
    await modalMvFunction.present();
    await modalMvFunction.onDidDismiss().then((response)=>{
      const responseDataTemp: string = response.data || '';
      if (responseDataTemp === '') {
        this.checkSelectedMvFunction(this.responseDataTemp || '');
      } else {
        this.setDataMvFunction.emit(response.data);
        this.checkSelectedMvFunction(responseDataTemp);
      }
    })
  }

  private checkSelectedMvFunction(responseDataTemp: string) {
    switch (true){
      case responseDataTemp === '':
        this.selectedMVFunction = 'Penggunaan Kendaraan';
        this.iconLeft = 'key'
        this.iconRight = 'caret-forward';
        this.iconColorRight = 'primary';
        break;
      case responseDataTemp === 'P':
        this.selectedMVFunction = 'Pribadi / Dinas';
        this.iconLeft = 'key'
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
        break;
      case responseDataTemp === 'S':
        this.selectedMVFunction = 'Disewakan';
        this.iconLeft = 'calculator';
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
        break;
      default:
        this.selectedMVFunction = 'Pribadi / Dinas';
        this.iconLeft = 'key'
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
        break;
    }
  }
}
