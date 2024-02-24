import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {ButtonComponent} from '@src/app/components/core/buttons/button/button.component';
import {MvDataService} from '@src/app/pages/kendaraan/store-kendaraan/mv.data.service';
import {map, take} from 'rxjs';
import {
  selectAllAccessories
} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.selector";
import {Store} from "@ngrx/store";
import {updateKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions";
import {CarInsuranceState} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";

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
  ) {}

  ngOnInit() {
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
        this.ADDITIONAL_RISK = r_data;
        this.addedRiskIndexes = [];
        const newData: Partial<CarInsuranceState> = {
          addrisk_all: r_data.map((item)=> item.risk_number),
          addrisk: []
        };
        this.store.dispatch(updateKendaraanData({ newData }));
        this.cdRef.markForCheck();
      });
  }

  async dismissModal() {
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
        this.ADDITIONAL_RISK = r_data;
        const newData: Partial<CarInsuranceState> = {
          mainrisk: risk_number,
          addrisk_all: r_data.map((item)=> item.risk_number),
          addrisk: []
        };
        this.store.dispatch(updateKendaraanData({ newData }));
        this.cdRef.markForCheck();
      });
  }

  toggleItem(riskNumber: string): void {
    const index = this.addedRiskIndexes.indexOf(riskNumber);
    if (index !== -1) {
      this.addedRiskIndexes.splice(index, 1); // Hapus nomor risiko dari array jika sudah ada
      const data = this.sortArrayByValue(this.addedRiskIndexes);
      const newData: Partial<CarInsuranceState> = {
        addrisk: [...data],
      };
      this.store.dispatch(updateKendaraanData({ newData }));
      this.cdRef.markForCheck();
    } else {
      this.addedRiskIndexes.push(riskNumber); // Tambahkan nomor risiko ke dalam array jika belum ada
      const data = this.sortArrayByValue(this.addedRiskIndexes);
      const newData: Partial<CarInsuranceState> = {
        addrisk: [...data],
      };
      this.store.dispatch(updateKendaraanData({ newData }));
      this.cdRef.markForCheck();
    }

  }


  updateKendaraanPayload(property: string, value: any) {
    this.mvDataService.updateKendaraanPayload(property, value);
  }

  sortArrayByValue(arr: any[]): any[] {
    if (arr.length > 0){
      return arr.sort((a, b) => a - b);
    } else {
      return arr;
    }
  }

  searchInsurance() {
    const data = this.sortArrayByValue(this.addedRiskIndexes);
    console.log(data);
    this.cdRef.markForCheck();
  }
}
