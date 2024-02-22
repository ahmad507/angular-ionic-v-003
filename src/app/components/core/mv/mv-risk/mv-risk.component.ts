import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ButtonComponent } from '@src/app/components/core/buttons/button/button.component';
import { MvDataService } from '@src/app/pages/kendaraan/store-kendaraan/mv.data.service';
import { map, pluck, take } from 'rxjs';

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
// Interface untuk respons
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
})
export class MvRiskComponent implements OnInit {
  @Input() dataRisk: any[] = [];
  @Input() mvType: string = '';
  @Input() mainRisk: string = '';

  showFullText = false;
  ADDITIONAL_RISK: any = [];

  constructor(
    private modalController: ModalController,
    private mvDataService: MvDataService
  ) {}

  ngOnInit() {
    this.mainRisk = '1';
    this.getAdditionalRisk(this.mainRisk);
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
      });
  }
}
