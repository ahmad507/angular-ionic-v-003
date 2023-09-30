import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AlertController, IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ButtonComponent,
  ],
  selector: 'app-modal-nasabah',
  templateUrl: './modal-nasabah.component.html',
  styleUrls: ['./modal-nasabah.component.scss'],
})
export class ModalNasabahComponent  implements OnInit {
  listNasabah: any = [];
  private selectedTipeNasabah: string = '';

  constructor(private modalController: ModalController) { this.callApiForNasabah() }

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss(this.selectedTipeNasabah, 'confirm');
  }

  async getDataTipeNasabah(item: any) {
    this.selectedTipeNasabah = item.id;
    await this.dismissModal();
  }

  private callApiForNasabah() {
    const tipeNasabah = [
      {
        id: '1',
        text: 'Perorangan',
      },
      {
        id: '2',
        text: 'Perusahaan',
      },
    ];
    this.listNasabah = tipeNasabah;
  }

  getIconName(text: any) {
    if (text === 'Perorangan'){
      return 'person';
    } else {
      return 'business-outline';
    }
  }
}
