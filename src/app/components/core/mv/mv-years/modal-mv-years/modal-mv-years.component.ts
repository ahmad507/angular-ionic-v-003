import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-modal-mv-years',
  templateUrl: './modal-mv-years.component.html',
  styleUrls: ['./modal-mv-years.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ButtonComponent
  ]
})
export class ModalMvYearsComponent  implements OnInit {
  listMvYear: any = [];
  private selectedMvYear: number = 0;

  constructor(private modalController: ModalController) { }

  ngOnInit() {this.callApiForMvYear()}

  private callApiForMvYear() {
    let dateNow = new Date();
    let yearNow = dateNow.getFullYear();
    let arrData = [];
    for(let i = yearNow; i >= (yearNow - 15); i--){
      arrData.push({id:i, text:i});
    }
    this.listMvYear = arrData;
  }

  async dismissModal() {
    this.selectedMvYear = this.selectedMvYear === 0 ? new Date().getFullYear() : this.selectedMvYear;
    await this.modalController.dismiss(this.selectedMvYear, 'confirm');
  }

  async getDataMvYear(item: any) {
    this.selectedMvYear = item.id;
    await this.dismissModal();
  }
}
