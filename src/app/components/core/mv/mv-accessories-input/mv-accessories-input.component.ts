import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "@src/app/components/core/buttons/button/button.component";
import { AccessoryService } from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.service";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-mv-accessories-input',
  templateUrl: './mv-accessories-input.component.html',
  styleUrls: ['./mv-accessories-input.component.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ButtonComponent
  ],
  standalone: true
})
export class MvAccessoriesInputComponent implements OnInit {
  @Input() acc_props: any;
  @Input() inputMerekAcc = '';
  @Input() inputHargaAcc = '';

  isMerekFocused = false;
  isHargaFocused = false;
  accessories$ = this.accessoryService.getAllAccessories();

  constructor(
    private modalController: ModalController,
    private accessoryService: AccessoryService,
    private store: Store
  ) { }

  ngOnInit() {
  }

  handleClick(acc_props: string) {
    const data = this.prepareData(acc_props);
    this.accessoryService.addAccessory(data);
    this.resetInputs();
    this.modalController.dismiss();
  }

  onFocus(input: string): void {
    this.isMerekFocused = input === 'merek';
    this.isHargaFocused = input === 'harga';
  }

  onBlur(input: string): void {
    this.isMerekFocused = input === 'merek' && this.inputMerekAcc !== '';
    this.isHargaFocused = input === 'harga' && this.inputHargaAcc !== '';
  }

  private prepareData(name: string) {
    return {
      name,
      harga: parseFloat(this.inputHargaAcc),
      merek: this.inputMerekAcc,
    };
  }

  private resetInputs() {
    this.inputMerekAcc = '';
    this.inputHargaAcc = '';
  }
}
