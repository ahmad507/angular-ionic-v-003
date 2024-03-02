// INITIAL SET ADDITIONAL RISK OPTIONS
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {ButtonComponent} from '@src/app/components/core/buttons/button/button.component';
import {MvDataService} from '@src/app/pages/kendaraan/store-kendaraan/mv.data.service';
import {catchError, map, take} from 'rxjs';
import {Store} from "@ngrx/store";
import {updateDataCoverageList, updateKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions";
import {CarInsuranceState} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";
import {MvRiskInputComponent} from "@src/app/components/core/mv/mv-risk/mv-risk-input/mv-risk-input.component";
import {selectKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";
import {Router} from "@angular/router";

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

  ADD_SI: any = [];
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
    private store: Store,
    private router: Router
  ) {
    this.addedRiskIndexes = [];
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
          addsi_all: [],
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

  async toggleItemV01(item: any) {
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
          console.log(res.data)
          this.DEFAULT_ADD_SI_ALL = [...res.data.DEFAULT_ADD_SI_ALL];
          this.getNominalAdditional(this.ADDITIONAL_RISK, this.DEFAULT_ADD_SI_ALL);
          this.cdRef.markForCheck();
        })
      }
      this.cdRef.markForCheck();
    }
  }

  async toggleItem(item: any) {
    const index = this.addedRiskIndexes.indexOf(item.risk_number);
    if (index !== -1) {
      this.addedRiskIndexes.splice(index, 1); // Hapus nomor risiko dari array jika sudah ada
    } else {
      this.addedRiskIndexes.push(item.risk_number); // Tambahkan nomor risiko ke dalam array jika belum ada
    }
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
        this.DEFAULT_ADD_SI_ALL = [...res.data.DEFAULT_ADD_SI_ALL];
        const newData: Partial<CarInsuranceState> = {
          total_passenger: res.data.TOTAL_PASSENGER,
        };
        this.store.dispatch(updateKendaraanData({newData}));
        this.getNominalAdditional(this.ADDITIONAL_RISK, this.DEFAULT_ADD_SI_ALL);
      });
    }
    this.cdRef.markForCheck();
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
    const data = {
      default_add_si: this.DEFAULT_ADD_SI_ALL,
      add_si_selected: this.addedRiskIndexes
    };
    this.ADD_SI = this.getAddSi(data);
    if (this.ADD_SI.length === 0) {
      switch (this.mainRisk) {
        case '1':
          this.setAddSiDefaults([
            {"7": "10,000,000"},
            {"8": "10,000,000"},
            {"9": "10,000,000"},
            {"10": "10,000,000"}
          ]);
          break;
        case '2':
          this.setAddSiDefaults([
            {"18": "10,000,000"},
            {"19": "10,000,000"},
            {"20": "10,000,000"},
            {"21": "10,000,000"}
          ]);
          break;
        default:
          this.setAddSiDefaults([
            {"7": "10,000,000"},
            {"8": "10,000,000"},
            {"9": "10,000,000"},
            {"10": "10,000,000"}
          ]);
      }
    }
    const newData: Partial<CarInsuranceState> = {
      addsi: [...this.ADD_SI],
      addsi_all: [...this.DEFAULT_ADD_SI_ALL],
    };
    this.store.dispatch(updateKendaraanData({newData}));
    this.store.select(selectKendaraanData).pipe(take(1)).subscribe((res) => {
      const mvObjectRequest = this.createObjectRequest(res);
      this.mvDataService.sendRequestCoverageList(mvObjectRequest).pipe(
        take(1),
        map((res: any) => res.r_data),
        catchError(async error => {
          console.log('ERROR', error.error.r_data)
        })
      ).subscribe(async (res) => {
        const mv_coverages_list = res;
        this.store.dispatch(updateDataCoverageList({mv_coverages_list}));
        await this.modalController.dismiss();
        await this.router.navigate(['kendaraan/mv-list-insurance']);
      })
    })
    this.cdRef.markForCheck();
  }

  private setAddSiDefaults(defaults: { [key: string]: string }[]) {
    this.DEFAULT_ADD_SI_ALL = defaults.map(obj => ({...obj}));
  }

  private getAddSi(data: { add_si_selected: string[]; default_add_si: any }) {
    const value_selected_2: { [key: string]: string }[] = [];
    data.add_si_selected.forEach((key: string) => {
      const obj = data.default_add_si.find((item: any) => key in item);
      if (obj) {
        const newObj: { [key: string]: string } = {};
        newObj[key] = obj[key];
        value_selected_2.push(newObj);
      }
    });
    return value_selected_2;
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
          addrisk: [],
          addsi: [],
          addsi_all: []
        };
        this.store.dispatch(updateKendaraanData({newData}));
        this.cdRef.markForCheck();
      });
  }

  private createObjectRequest(res: CarInsuranceState) {
    const tahunSekarang = new Date().getFullYear();
    const v_year = tahunSekarang - res.vyear;
    return {
      ctype: res.ctype,
      license: res.license,
      vfunction: res.vfunction,
      vtype: res.vtype,
      vyear: v_year,
      vcode: res.vcode,
      vmodel: res.vmodel,
      vbrand: res.vbrand,
      year_period: res.year_period,
      mainsi: res.mainsi,
      accesories_si: res.accesories_si,
      accesories_detail: res.accesories_detail,
      mainrisk: res.mainrisk,
      reg_no: "y/NjxXjn1UkFwAeru6kpc7hSeOGuTkvoQd2NMm92AyKmYdp3ccidCxOKMtK0ghDRahD9jgf3nvo/URbpDGXU6g==",
      addrisk: res.addrisk,
      sortby: "",
      total_passenger: res.vtype === 'A' ? res.total_passenger[0] : '1',
      addrisk_all: res.addrisk_all,
      addsi_all: res.addrisk_all,
      addsi: res.addsi
    };
  }

  private handleErrorCoveragesResult(res: CarInsuranceState) {
    return res;
  }
}
