import { Component, OnInit } from '@angular/core';
import {AlertController, IonicModule, LoadingController, ModalController} from "@ionic/angular";
import {DataServiceKendaraan} from "@src/app/components/core/mv/data/mv.data.service";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@Component({
  standalone: true,
  selector: 'app-modal-mv-license',
  templateUrl: './modal-mv-license.component.html',
  styleUrls: ['./modal-mv-license.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ButtonComponent
  ]
})
export class ModalMvLicenseComponent  implements OnInit {
  private selectedMvLicense: object = { desc:'', id: '', text: '' };

  listMvLicense: any = [];

  constructor(
    private modalController: ModalController,
    private loadingCOntroller: LoadingController,
    private alertController: AlertController,
    private dataServiceKendaraan: DataServiceKendaraan) {this.getMvLicense()}

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss(this.selectedMvLicense, 'confirm');
  }

  private async getMvLicense() {
    const loading = await this.loadingCOntroller.create({
      spinner: 'circles',
    });
    await loading.present();
    this.dataServiceKendaraan.getListLicense().pipe().subscribe((res) => {
      const responseData = res.r_data;
      let arrDataPlat: any = [];
      loading.dismiss();
      responseData.forEach((res) => {
        arrDataPlat.push({
          id: res.license_code,
          text: res.license_code + ' - ' + res.license_description,
          desc: res.license_description
        });
      });
      this.listMvLicense = arrDataPlat;
    }, async (res) => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        message: 'Mohon Maaf Terjadi Kesalahan',
        buttons:[
          {
            text: 'Kembali',
            role: 'confirm',
            handler: () => {
              this.dismissModal();
            },
          },
        ]
      });
      await alert.present();
    });
  }

  async getDataMvLicense(item: any) {
    this.selectedMvLicense = item;
    await this.dismissModal();
  }

}
