import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ModalNasabahComponent} from "@src/app/components/core/nasabah/modal-nasabah/modal-nasabah.component";
import {Store} from "@ngrx/store";
import {selectKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  selector: 'app-nasabah',
  templateUrl: './nasabah.component.html',
  styleUrls: ['./nasabah.component.scss'],
})
export class NasabahComponent  implements OnInit {
  @Input() iconLeft: string = 'person';
  @Input() iconColorRight: string = 'primary';
  @Input() iconRight: string = 'caret-forward';
  @Input() tipeNasabah: string = '1';

  @Output() setDataTipeNasabah = new EventEmitter<string>();

  selectedTipeNasabah: string = 'Jenis Nasabah';
  private responseDataTemp: string = '';

  constructor(
    private modalController : ModalController,
    private store : Store,
    ) { }

  ngOnInit() {
    this.store.select(selectKendaraanData).pipe().subscribe((res)=>{
      this.responseDataTemp = res.ctype;
      this.checkSelectedNasabah(this.responseDataTemp);
    })
  }

  async openModalTipeNasabah() {
    const modalTipeNasabah = await this.modalController.create({
      component: ModalNasabahComponent,
    });
    await modalTipeNasabah.present();
    await modalTipeNasabah.onDidDismiss().then((response)=>{
      const responseDataTemp: string = response.data || '';
      if (responseDataTemp === '') {
        this.checkSelectedNasabah(this.responseDataTemp || '');
      } else {
        this.setDataTipeNasabah.emit(responseDataTemp);
        this.checkSelectedNasabah(responseDataTemp);
      }
    })
  }

  private checkSelectedNasabah(responseDataTemp: string) {
    switch (true){
      case responseDataTemp === '':
        this.selectedTipeNasabah = 'Jenis Nasabah';
        this.iconLeft = 'person'
        this.iconRight = 'caret-forward';
        this.iconColorRight = 'primary';
        break;
      case responseDataTemp === '1':
        this.selectedTipeNasabah = 'Perorangan';
        this.iconLeft = 'person'
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
        break;
      case responseDataTemp === '2':
        this.selectedTipeNasabah = 'Perusahaan';
        this.iconLeft = 'business-outline';
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
        break;
      default:
        this.selectedTipeNasabah = 'Perorangan';
        this.iconLeft = 'person'
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
    }
  }
}
