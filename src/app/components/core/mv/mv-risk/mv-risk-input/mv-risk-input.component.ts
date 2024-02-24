import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputComponent} from "@src/app/components/core/input/input/input.component";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";
import {HomePageModule} from "@src/app/pages/home/home.module";

@Component({
  selector: 'app-mv-risk-input',
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    HomePageModule,
  ],
  templateUrl: './mv-risk-input.component.html',
  styleUrls: ['./mv-risk-input.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MvRiskInputComponent implements OnInit {
  @Input() dataItem: any = [];
  @Input() DEFAULT_ADD_SI_ALL: any = [];
  @Input() RISK_CODE: string = '';
  @Input() nominal_tjh: any = (10000000).toLocaleString();

  KDP_NOMINAL: any = [
    {id: 0, nominal: 2500000, text: '2,5'},
    {id: 1, nominal: 5000000, text: '5'},
    {id: 2, nominal: 10000000, text: '10'},
    {id: 3, nominal: 15000000, text: '15'},
    {id: 4, nominal: 20000000, text: '20'},
    {id: 5, nominal: 25000000, text: '25'}
  ];

  THJ_NOMINAL: any = [
    {id: 0, nominal: 5000000, text: '5'},
    {id: 1, nominal: 10000000, text: '10'},
    {id: 2, nominal: 15000000, text: '15'},
    {id: 3, nominal: 20000000, text: '20'},
    {id: 4, nominal: 30000000, text: '30'},
    {id: 5, nominal: 40000000, text: '40'},
    {id: 6, nominal: 50000000, text: '50'},
    {id: 7, nominal: 75000000, text: '75'},
    {id: 8, nominal: 100000000, text: '100'}
  ];

  PASSENGERS: any = [
    {id: 0, passenger: 1},
    {id: 1, passenger: 2},
    {id: 2, passenger: 3},
    {id: 3, passenger: 4},
  ]

  constructor(
    private modalController: ModalController,
  ) {
  }

  ngOnInit() {
    this.RISK_CODE = this.dataItem.risk_code;
    this.THJ_NOMINAL = this.THJ_NOMINAL.map((item: any, index: number) => ({text: item.text, selected: index === 0}));
    this.KDP_NOMINAL = this.KDP_NOMINAL.map((item: any, index: number) => ({text: item.text, selected: index === 0}));
    this.PASSENGERS = this.PASSENGERS.map((item: any, index: number) => ({
      passenger: item.passenger,
      selected: index === 0
    }));
  }

  async dismissModal() {
    this.setDataTjh(this.dataItem, this.DEFAULT_ADD_SI_ALL, this.nominal_tjh);
    await this.modalController.dismiss(this.DEFAULT_ADD_SI_ALL, 'confirm');
  }

  toggleSelectionPassenger(index: number): void {
    // Mengatur status pilihan untuk item saat ini
    this.PASSENGERS[index].selected = !this.PASSENGERS[index].selected;
    // Mengatur status tidak dipilih untuk semua item kecuali yang saat ini dipilih
    this.PASSENGERS.forEach((item: any, i: number) => {
      if (i !== index) {
        item.selected = false;
      }
    });
  }

  toggleSelectionKdp(index: number): void {
    // Mengatur status pilihan untuk item saat ini
    this.KDP_NOMINAL[index].selected = !this.KDP_NOMINAL[index].selected;
    // Mengatur status tidak dipilih untuk semua item kecuali yang saat ini dipilih
    this.KDP_NOMINAL.forEach((item: any, i: number) => {
      if (i !== index) {
        item.selected = false;
      }
    });
  }

  toggleSelectionTjh(index: number): void {
    // Mengatur status pilihan untuk item saat ini
    this.THJ_NOMINAL[index].selected = !this.THJ_NOMINAL[index].selected;
    // Mengatur status tidak dipilih untuk semua item kecuali yang saat ini dipilih
    this.THJ_NOMINAL.forEach((item: any, i: number) => {
      if (i !== index) {
        item.selected = false;
      }
    });
    const selectedNominal = this.THJ_NOMINAL.find((item: any) => item.selected);
    const nominal_tjh = selectedNominal ? selectedNominal.text : null;
    this.nominal_tjh = (parseInt(nominal_tjh) * 1000000).toLocaleString();
  }

  private setDataTjh(dataItem: any, DEFAULT_ADD_SI_ALL: any, nominal_tjh: number) {
    const {risk_number} = dataItem;
    for (let i = 0; i < DEFAULT_ADD_SI_ALL.length; i++) {
      const obj = DEFAULT_ADD_SI_ALL[i];
      const key = Object.keys(obj)[0]; // Mendapatkan kunci pertama pada objek
      if (key === risk_number) {
        obj[key] = nominal_tjh.toString(); // Ubah nilai properti menjadi string
        break;
      }
    }
  }
}
