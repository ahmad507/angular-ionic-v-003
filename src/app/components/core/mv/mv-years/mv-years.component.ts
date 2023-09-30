import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ModalMvYearsComponent} from "@src/app/components/core/mv/mv-years/modal-mv-years/modal-mv-years.component";

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


  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async openModalMVYear() {
    const modalMvType = await this.modalController.create({
      component: ModalMvYearsComponent
    });
    await modalMvType.present();
    await modalMvType.onDidDismiss().then((response)=>{
      this.setDataMvYear.emit(response.data);
      this.selectedMVYear = `Tahun : ${response.data}`
      this.iconRight = 'checkmark-circle-sharp';
      this.iconColorRight = 'success';
    })
  }
}
