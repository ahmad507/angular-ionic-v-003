import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputComponent} from "@src/app/components/core/input/input/input.component";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";

@Component({
  selector: 'app-mv-risk-input',
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './mv-risk-input.component.html',
  styleUrls: ['./mv-risk-input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MvRiskInputComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss();
  }
}
