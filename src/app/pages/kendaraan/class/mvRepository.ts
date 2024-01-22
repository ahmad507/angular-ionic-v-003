import {Store} from "@ngrx/store";
import {selectKendaraanData, selectMvInfoDetailData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {shareReplay, take, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {
  MvAccessoriesComponent
} from "@src/app/components/core/mv/mv-accessories/mv-accessories/mv-accessories.component";
import {ModalController} from "@ionic/angular";
import {MvModalComponent} from "@src/app/components/core/mv/mv-modal/mv-modal.component";
import {MvRisk} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";
import {MvRiskComponent} from "@src/app/components/core/mv/mv-risk/mv-risk.component";


@Injectable({
  providedIn: 'root'
})
export class MvRepository {
  constructor(
    private store: Store,
    private modalController: ModalController
  ) {}


  getStoreMvData() {
    return this.store.select(selectKendaraanData).pipe(
      take(1),
      shareReplay(1)
    )
  }
  getStoreMvDetailData(){
    return this.store.select(selectMvInfoDetailData).pipe(
      take(1),
      shareReplay(1)
    )
  }

  async openModalAccessories(data: any) {
    const modalAccMv = await this.modalController.create({
      component: MvAccessoriesComponent,
      componentProps: {
        mv_price: data
      }
    });
    await modalAccMv.present();
  }

  async openModalWarning(message: string, imgSource: string, btnText: string) {
    const modalWarning = await this.modalController.create({
      component: MvModalComponent,
      componentProps: {
        message: 'Silahkan untuk melengkapi data terlebih dahulu',
        imgSource: 'assets/undraw_selection_re_ycpo.png',
        btnText: 'Ok, Lanjutkan...'
      },
      cssClass: 'custom-modal',
      backdropDismiss: false,
      showBackdrop: true,
      initialBreakpoint: 1,
      backdropBreakpoint: 1
    })
    await modalWarning.present();
  }

  async openModalMainRisk(r_data: MvRisk[], mvTYpe:any) {
    const modalRisk = await this.modalController.create({
      component: MvRiskComponent,
      componentProps: {
        dataRisk: r_data,
        mvType: mvTYpe
      },
    })
    await modalRisk.present();
  }
}
