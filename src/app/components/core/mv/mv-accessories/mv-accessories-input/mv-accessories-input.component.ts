import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import {AccessoryService} from '@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputComponent} from '@src/app/components/core/input/input/input.component';
import {ButtonComponent} from '@src/app/components/core/buttons/button/button.component';
import {from, map} from 'rxjs';

@Component({
  selector: 'app-mv-accessories-input',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './mv-accessories-input.component.html',
  styleUrls: ['./mv-accessories-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MvAccessoriesInputComponent implements OnInit {
  @Input() acc_props: any;
  @Output() dataChanged = new EventEmitter<any>();

  inputMerekAcc: string = '';
  inputHargaAcc: string = '';
  isMerekFocused = false;
  isHargaFocused = false;

  accessories$ = this.accessoryService.getAllAccessories();
  isNumeric: boolean = false;

  constructor(
    private modalController: ModalController,
    private accessoryService: AccessoryService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.isNumeric = true;
  }

  convertValueInputHarga(props: string) {
    this.accessoryService.getAllAccessories().subscribe((res: any[]) => {
      if (res.length > 0) {
        const productsObservable = from(res);
        productsObservable
          .pipe(
            map((product) => ({
              ...product,
              harga: product.harga.toLocaleString(),
            }))
          )
          .subscribe((newProducts) => {
            if (newProducts.name !== props) {
              this.inputHargaAcc = '';
            } else {
              this.inputHargaAcc = newProducts.harga;
            }
          });
      }
    });
  }

  ngOnInit() {
    this.convertValueInputHarga(this.acc_props);
  }

  handleClick(acc_props: string) {
    const integerValue = parseInt(
      this.inputHargaAcc.replace(/[^0-9]/g, ''),
      10
    );
    const data = {
      name: acc_props,
      harga: integerValue,
      merek: this.inputMerekAcc,
    };
    this.accessoryService.addAccessory(data);
    this.resetInputs();
    this.modalController.dismiss().then(()=> {
      this.dataChanged.emit(data);
      this.cdRef.markForCheck();
    });
  }

  onFocus(input: string): void {
    this.isMerekFocused = input === 'merek';
    this.isHargaFocused = input === 'harga';
  }

  onBlur(input: string): void {
    this.isMerekFocused = input === 'merek' && this.inputMerekAcc !== '';
    this.isHargaFocused = input === 'harga' && this.inputHargaAcc !== '';
  }

  private resetInputs() {
    this.inputMerekAcc = '';
    this.inputHargaAcc = '';
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  replaceUnderscoreWithSpace(accessory: string) {
    const stringWithSpaces = accessory.replace(/_/g, ' ');
    const words = stringWithSpaces.split(' ');
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    return capitalizedWords.join(' ');
  }
}
