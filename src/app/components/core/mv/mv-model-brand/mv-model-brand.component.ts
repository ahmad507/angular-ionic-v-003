import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule, ModalController} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {
  ModalMvModelBrandComponent
} from "@src/app/components/core/mv/mv-model-brand/modal-mv-model-brand/modal-mv-model-brand.component";

@Component({
  standalone: true,
  imports:[CommonModule, FormsModule, IonicModule],
  selector: 'app-mv-model-brand',
  templateUrl: './mv-model-brand.component.html',
  styleUrls: ['./mv-model-brand.component.scss'],
})
export class MvModelBrandComponent  implements OnInit {
  @Input() iconLeft: string = 'ribbon';
  @Input() iconColorRight: string = 'primary';
  @Input() iconRight: string = 'caret-forward';

  selectedMVBrandModel: string =  'Merek - Model Kendaraan';

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async openModalBrand() {
    const modalMvModelBrand = await this.modalController.create({
      component: ModalMvModelBrandComponent
    });
    await modalMvModelBrand.present();

  }
}
