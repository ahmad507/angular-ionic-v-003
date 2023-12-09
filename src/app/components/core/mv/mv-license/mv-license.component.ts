import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {
  ModalMvLicenseComponent
} from "@src/app/components/core/mv/mv-license/modal-mv-license/modal-mv-license.component";
import {Store} from "@ngrx/store";
import {selectKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";

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
  private responseDataTempLicense: string = '';
  private responseDataTempLicenseRegion: string = '';

  constructor(
    private modalController : ModalController,
    private store : Store,
  ) { }

  ngOnInit() {
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.responseDataTempLicense = res.license;
      this.responseDataTempLicenseRegion = res.license_region;
      this.checkSelectedLicense(this.responseDataTempLicense, this.responseDataTempLicenseRegion);
    })
  }

  async openModalMVLicense() {
    const modalMvPlatWilayah = await this.modalController.create({
      component: ModalMvLicenseComponent
    });
    await modalMvPlatWilayah.present();
    await modalMvPlatWilayah.onDidDismiss().then((response)=>{
      const responseDataTemp: any = response.data.id || '';
      if (responseDataTemp === ''){
        this.checkSelectedLicense(this.responseDataTempLicense, this.responseDataTempLicenseRegion);
      } else {
        this.setDataMvLicense.emit(response.data);
        this.checkSelectedLicense(this.responseDataTempLicense, this.responseDataTempLicenseRegion);
      }
    })
  }

  private checkSelectedLicense(responseDataTempLicense: string, responseDataTempLicenseRegion: string) {
    if (responseDataTempLicense && responseDataTempLicenseRegion !== ''){
      this.selectedMVLicense = responseDataTempLicenseRegion;
      this.iconRight = 'checkmark-circle-sharp';
      this.iconColorRight = 'success';
    } else{
      this.selectedMVLicense = 'Plat Wilayah';
      this.iconRight = 'caret-forward';
      this.iconColorRight = 'primary';
    }
  }
}
