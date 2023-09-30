import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-modal-mv-model-brand',
  templateUrl: './modal-mv-model-brand.component.html',
  styleUrls: ['./modal-mv-model-brand.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ModalMvModelBrandComponent  implements OnInit {
  selectedMvModelBrand: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss(this.selectedMvModelBrand, 'confirm');
  }
}
