import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";

@Component({
  standalone: true,
  selector: 'app-modal-mv-type',
  templateUrl: './modal-mv-type.component.html',
  styleUrls: ['./modal-mv-type.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ButtonComponent
  ]
})
export class ModalMvTypeComponent  implements OnInit {
  private selectedMvType: string = '';
  listMvType: any = [];

  constructor(private modalController: ModalController) { this.callApiForMvType() }

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss(this.selectedMvType, 'confirm');
  }

  private callApiForMvType() {
    const jenisKendaraan = [
      {
        id: 'A',
        text: 'Sedan, Minibus, Jeep, City Car',
      },
      {
        id: 'B',
        text: 'Bus',
      },
      {
        id: 'D',
        text: 'Sepeda Motor',
      },
    ];
    this.listMvType = jenisKendaraan;
  }

  getIconName(id: string) {
    switch (id){
      case 'A':
        return  'car';
        break;
      case 'B':
        return  'bus';
        break;
      case 'D':
        return  'bicycle';
        break;
      default:
        return  'car';
    }
  }

  async getDataMvType(item: any) {
    this.selectedMvType = item.id;
    await this.dismissModal();
  }
}
