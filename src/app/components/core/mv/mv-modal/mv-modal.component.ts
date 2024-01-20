import {Component, Input, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";

@Component({
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ButtonComponent
  ],
  selector: 'app-mv-modal',
  templateUrl: './mv-modal.component.html',
  styleUrls: ['./mv-modal.component.scss'],
})
export class MvModalComponent  implements OnInit {
  @Input() message: string = '';
  @Input() btnText: string = '';
  @Input() imgSource: string = '';
  constructor( private modalController: ModalController) { }

  ngOnInit() {}

  async dismissModal(){
    await this.modalController.dismiss();
  }

}
