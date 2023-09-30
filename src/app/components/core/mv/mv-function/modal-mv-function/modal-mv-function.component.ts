import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-modal-mv-function',
  templateUrl: './modal-mv-function.component.html',
  styleUrls: ['./modal-mv-function.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ButtonComponent,
  ]
})
export class ModalMvFunctionComponent  implements OnInit {
  private selectedMvFunction: string = '';
  listMvFunction: any = [];

  constructor(private modalController: ModalController) { this.callApiMvFunction() }

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss(this.selectedMvFunction, 'confirm');
  }

  getIconName(text: string) {
    if (text === 'P'){
      return 'key';
    } else {
      return 'calculator';
    }
  }

  async getDataMvFunction(item: any) {
    this.selectedMvFunction = item.id;
    await this.dismissModal();
  }

  private callApiMvFunction() {
    const tipePengguna = [
      {
        id: 'P',
        text: 'Pribadi / Dinas (Non-Komersil)'
      },
      {
        id: 'S',
        text: 'Disewakan (Komersil)'
      },
    ];
    this.listMvFunction = tipePengguna;
  }
}
