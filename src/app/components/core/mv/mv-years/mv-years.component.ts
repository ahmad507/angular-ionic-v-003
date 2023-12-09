import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ModalMvYearsComponent} from "@src/app/components/core/mv/mv-years/modal-mv-years/modal-mv-years.component";
import {Store} from "@ngrx/store";
import {selectKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";

@Component({
  standalone: true,
  selector: 'app-mv-years',
  templateUrl: './mv-years.component.html',
  styleUrls: ['./mv-years.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class MvYearsComponent  implements OnInit {
  @Input() iconLeft: string = 'calendar-number';
  @Input() iconColorRight: string = 'primary';
  @Input() iconRight: string = 'caret-forward';

  @Output() setDataMvYear = new EventEmitter<number>();

  selectedMVYear: string = 'Tahun Kendaraan';
  private responseDataTempVYear: number = 0;


  constructor(
    private modalController : ModalController,
    private store : Store,
  ) { }

  ngOnInit() {
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.responseDataTempVYear = res.vyear;
      this.checkSelectedMvFunction(this.responseDataTempVYear);
    })
  }

  async openModalMVYear() {
    const modalMvType = await this.modalController.create({
      component: ModalMvYearsComponent
    });
    await modalMvType.present();
    await modalMvType.onDidDismiss().then((response)=>{
      const responseDataTemp = response.data;
      if (responseDataTemp === 0){
        this.checkSelectedMvFunction(responseDataTemp);
      }else {
        this.setDataMvYear.emit(response.data);
        this.checkSelectedMvFunction(responseDataTemp);
      }
    })
  }

  private checkSelectedMvFunction(responseDataTempVYear: number) {
    if (responseDataTempVYear === 0) {
      this.selectedMVYear = this.responseDataTempVYear !== 0 ? `Tahun : ${this.responseDataTempVYear}` : 'Tahun Kendaraan';
    } else {
      this.selectedMVYear = `Tahun : ${responseDataTempVYear}`;
    }
    this.iconRight = responseDataTempVYear === 0 ? (this.responseDataTempVYear !== 0 ? 'checkmark-circle-sharp' : 'caret-forward') : 'checkmark-circle-sharp';
    this.iconColorRight = responseDataTempVYear === 0 ? (this.responseDataTempVYear !== 0 ? 'success' : 'primary') : 'success';
  }

}
