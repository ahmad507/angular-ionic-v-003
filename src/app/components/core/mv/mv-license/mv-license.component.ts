import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {
  ModalMvLicenseComponent
} from "@src/app/components/core/mv/mv-license/modal-mv-license/modal-mv-license.component";

@Component({
  standalone: true,
  selector: 'app-mv-license',
  templateUrl: './mv-license.component.html',
  styleUrls: ['./mv-license.component.scss'],
  imports: [
    IonicModule
  ]
})
export class MvLicenseComponent  implements OnInit {
  @Input() iconLeft: string = 'location';
  @Input() iconRight: string = 'caret-forward';
  @Input() iconColorRight: string = 'primary';

  @Output() setDataMvLicense = new EventEmitter<object>();

  selectedMVLicense: string = 'Plat Wilayah';

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async openModalMVLicense() {
    const modalMvPlatWilayah = await this.modalController.create({
      component: ModalMvLicenseComponent
    });
    await modalMvPlatWilayah.present();
    await modalMvPlatWilayah.onDidDismiss().then((resposne)=>{
      this.selectedMVLicense = resposne.data.text;
      this.iconRight = 'checkmark-circle-sharp';
      this.iconColorRight = 'success';
      this.setDataMvLicense.emit(resposne.data);
    })
  }
}
