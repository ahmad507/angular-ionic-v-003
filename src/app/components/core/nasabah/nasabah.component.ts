import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ModalNasabahComponent} from "@src/app/components/core/nasabah/modal-nasabah/modal-nasabah.component";

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

  constructor(private modalController : ModalController) { }

  ngOnInit() {}

  async openModalTipeNasabah() {
    const modalTipeNasabah = await this.modalController.create({
      component: ModalNasabahComponent,
    });
    await modalTipeNasabah.present();
    await modalTipeNasabah.onDidDismiss().then((response)=>{
      this.setDataTipeNasabah.emit(response.data);
      if(response.data === '1'){
        this.selectedTipeNasabah = 'Perorangan';
        this.iconLeft = 'person'
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
      } else {
        this.selectedTipeNasabah = 'Perusahaan';
        this.iconLeft = 'business-outline';
        this.iconRight = 'checkmark-circle-sharp';
        this.iconColorRight = 'success';
      }
    })
  }
}
