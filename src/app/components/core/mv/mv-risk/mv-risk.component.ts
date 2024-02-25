// INITIAL SET ADDITIONAL RISK OPTIONS
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {ButtonComponent} from '@src/app/components/core/buttons/button/button.component';
import {MvDataService} from '@src/app/pages/kendaraan/store-kendaraan/mv.data.service';
import {map, take} from 'rxjs';
import {Store} from "@ngrx/store";
import {updateKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions";
import {CarInsuranceState} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";
import {MvRiskInputComponent} from "@src/app/components/core/mv/mv-risk/mv-risk-input/mv-risk-input.component";

export interface AdditionalRisk {
  risk_number: string;
  risk_code: string;
  main_risk_number: string;
  risk_description_id: string;
  risk_description_en: any;
  risk_long_desc: string;
  risk_long_desc_en: any;
  category: string;
  type: string;
  private_si_flags: string;
}

export interface ResponseAdditionalRisk {
  r_status: boolean;
  r_data: AdditionalRisk[];
  r_code: number;
  r_message: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ButtonComponent],
  selector: 'app-mv-risk',
  templateUrl: './mv-risk.component.html',
  styleUrls: ['./mv-risk.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MvRiskComponent implements OnInit {
  @Input() dataRisk: any[] = [];
  @Input() mvType: string = '';
  @Input() mainRisk: string = '';

  DEFAULT_ADD_SI_ALL: any = [];

  CO_ADD_SI_ALL = [
    {
      "7": "10,000,000"
    },
    {
      "8": "10,000,000"
    },
    {
      "9": "10,000,000"
    },
    {
      "10": "10,000,000"
    }
  ];

  TLO_ADD_SI_ALL = [
    {
      "18": "10,000,000"
    },
    {
      "19": "10,000,000"
    },
    {
      "20": "10,000,000"
    },
    {
      "21": "10,000,000"
    }
  ]

  showFullText = false;
  ADDITIONAL_RISK: any = [];
  ADDITIONAL_RISK_ALL: any = [];
  ADDITIONAL_RISK_DATA_SIMULATION: any = [];
  addedRiskIndexes: string[] = [];

  constructor(
    private modalController: ModalController,
    private mvDataService: MvDataService,
    private cdRef: ChangeDetectorRef,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.initializeRisk();
  }

  getAdditionalRisk(risk_number: any) {
    this.addedRiskIndexes = [];
    const dataObject = {
      maincover: risk_number,
      vehicletype: this.mvType,
    };
    this.mvDataService
      .mvAdditionalRisk(dataObject)
      .pipe(
        take<any>(1),
        map((response: ResponseAdditionalRisk) => response.r_data)
      )
      .subscribe((r_data: AdditionalRisk[]) => {
        this.DEFAULT_ADD_SI_ALL = this.mainRisk === '1' ? [...this.CO_ADD_SI_ALL] : [...this.TLO_ADD_SI_ALL];
        this.ADDITIONAL_RISK = r_data;
        this.getNominalAdditional(this.ADDITIONAL_RISK, this.DEFAULT_ADD_SI_ALL);
        const newData: Partial<CarInsuranceState> = {
          mainrisk: risk_number,
          addrisk_all: r_data.map((item) => item.risk_number),
          addrisk: [],
          addsi: [],
        };
        this.store.dispatch(updateKendaraanData({newData}));
        this.cdRef.markForCheck();
      });
  }

  async dismissModal() {
    const newData: Partial<CarInsuranceState> = {
      addrisk_all: [],
      addrisk: []
    };
    this.store.dispatch(updateKendaraanData({ newData }));
    await this.modalController.dismiss();
  }

  getRiskName(risk_number: any) {
    if (risk_number === '1') {
      return 'COMPREHENSIVE';
    } else {
      return 'TOTAL LOSS ONLY';
    }
  }

  getImgSrc(risk_number: any) {
    if (risk_number === '1') {
      return 'assets/compre.jpg';
    } else {
      return 'assets/tlo.jpg';
    }
  }

  async toggleItem(item: any) {
    const index = this.addedRiskIndexes.indexOf(item.risk_number);

    if (index !== -1) {
      this.addedRiskIndexes.splice(index, 1); // Hapus nomor risiko dari array jika sudah ada
      const data = this.sortArrayByValue(this.addedRiskIndexes);
      const newData: Partial<CarInsuranceState> = {
        addrisk: [...data],
      };
      this.store.dispatch(updateKendaraanData({newData}));
      this.cdRef.markForCheck();
    } else {
      this.addedRiskIndexes.push(item.risk_number); // Tambahkan nomor risiko ke dalam array jika belum ada
      const data = this.sortArrayByValue(this.addedRiskIndexes);
      const newData: Partial<CarInsuranceState> = {
        addrisk: [...data],
      };
      this.store.dispatch(updateKendaraanData({newData}));
      if (parseInt(item.private_si_flags) > 0) {
        const modal = await this.modalController.create({
          component: MvRiskInputComponent,
          componentProps: {
            dataItem: item,
            DEFAULT_ADD_SI_ALL: parseInt(item.main_risk_number) === 1 ? this.CO_ADD_SI_ALL : this.TLO_ADD_SI_ALL
          },
          initialBreakpoint: 0.75,
          breakpoints: [0, 0.55, 0.5, 0.75],
          backdropDismiss: false,
          cssClass: 'custom-modal-class',
        });
        await modal.present();
        await modal.onDidDismiss().then((res) => {
          this.DEFAULT_ADD_SI_ALL = [...res.data];
          this.getNominalAdditional(this.ADDITIONAL_RISK, this.DEFAULT_ADD_SI_ALL);
          this.cdRef.markForCheck();
        })
      }
      this.cdRef.markForCheck();
    }

  }

  getNominalAdditional(ADDITIONAL_RISK: any, DEFAULT_ADD_SI_ALL: any) {
    for (let i = 0; i < ADDITIONAL_RISK.length; i++) {
      const riskNumber = ADDITIONAL_RISK[i].risk_number;
      const defaultAddSI = DEFAULT_ADD_SI_ALL.find((obj: any) => obj.hasOwnProperty(riskNumber));
      if (defaultAddSI) {
        ADDITIONAL_RISK[i].nominal = defaultAddSI[riskNumber];
      }
    }
  }


  updateKendaraanPayload(property: string, value: any) {
    this.mvDataService.updateKendaraanPayload(property, value);
  }

  sortArrayByValue(arr: any[]): any[] {
    if (arr.length > 0) {
      return arr.sort((a, b) => a - b);
    } else {
      return arr;
    }
  }

  searchInsurance() {
    // const data = this.sortArrayByValue(this.addedRiskIndexes);
    this.cdRef.markForCheck();
  }

  private initializeRisk() {
    this.mainRisk = '1';
    const dataObject = {
      maincover: this.mainRisk,
      vehicletype: this.mvType,
    };
    this.mvDataService
      .mvAdditionalRisk(dataObject)
      .pipe(
        take<any>(1),
        map((response: ResponseAdditionalRisk) => response.r_data)
      )
      .subscribe((r_data: AdditionalRisk[]) => {
        this.DEFAULT_ADD_SI_ALL = this.mainRisk === '1' ? [...this.CO_ADD_SI_ALL] : [...this.TLO_ADD_SI_ALL];
        this.ADDITIONAL_RISK = r_data;
        this.getNominalAdditional(this.ADDITIONAL_RISK, this.DEFAULT_ADD_SI_ALL);
        this.addedRiskIndexes = [];
        const newData: Partial<CarInsuranceState> = {
          addrisk_all: r_data.map((item) => item.risk_number),
          addrisk: []
        };
        this.store.dispatch(updateKendaraanData({newData}));
        this.cdRef.markForCheck();
      });
  }
}
