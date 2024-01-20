import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule, ModalController} from "@ionic/angular";
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";
import {MvDataService} from "@src/app/pages/kendaraan/store-kendaraan/mv.data.service";
import {take} from "rxjs";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ButtonComponent],
  selector: 'app-mv-risk',
  templateUrl: './mv-risk.component.html',
  styleUrls: ['./mv-risk.component.scss'],
})
export class MvRiskComponent  implements OnInit {
  @Input() dataRisk: any[] = [];
  @Input() mvType: string = '';
  @Input() mainRisk: string = '';
  showFullText = false;

  dataDummy: any[] = [
    {
      "risk_number": "1",
      "risk_code": "COMP01",
      "main_risk_number": "0",
      "risk_description_id": "COMPREHENSIVE (Risiko Gabungan)",
      "risk_description_en": null,
      "risk_long_desc": "<p>Menjamin seluruh atau sebagian kerugian yang diakibatkan secara langsung oleh risiko tabrakan, terbalik, tergelincir dari jalan, benturan, pencurian termasuk pencurian dengan kekerasan, perbuatan jahat orang lain, kebakaran termasuk akibat sambaran petir dan kerugian akibat kecelakaan selama penyeberangan dengan alat penyeberangan resmi dari Dinas terkait.</p>",
      "risk_long_desc_en": null,
      "category": "M",
      "type": "ABCD",
      "private_si_flags": "0"
    },
    {
      "risk_number": "2",
      "risk_code": "TLO01",
      "main_risk_number": "0",
      "risk_description_id": "TOTAL LOSS ONLY (Kerusakan Total & Kehilangan)",
      "risk_description_en": null,
      "risk_long_desc": "<p>Memberikan jaminan atas kerugian yang diakibatkan secara langsung oleh risiko kerusakan yang dijamin di dalam Polis, dimana biaya perbaikannya sama atau lebih besar 75% dari harga kendaraan pada saat terjadinya risiko atau jika kendaraan hilang dicuri dan tidak diketemukan dalam waktu 60 hari.</p>",
      "risk_long_desc_en": null,
      "category": "M",
      "type": "ABCD",
      "private_si_flags": "0"
    }
  ]

  constructor(
    private modalController: ModalController,
    private mvDataService: MvDataService,
  ) {
    this.mainRisk = '1';
  }

  ngOnInit() {}

  async dismissModal() {
    await this.modalController.dismiss();
  }

  getRiskName(risk_number: any) {
    if (risk_number === '1'){
      return 'COMPREHENSIVE';
    } else {
      return 'TOTAL LOSS ONLY';
    }
  }

  getImgSrc(risk_number: any) {
    if (risk_number === '1'){
      return 'assets/compre.jpg';
    } else {
      return 'assets/tlo.jpg';
    }
  }

  getAdditionalRisk(risk_number: any) {
    const dataObject = {
      maincover: risk_number,
      vehicletype: this.mvType,
    }
    this.mvDataService.mvAdditionalRisk(dataObject).pipe(take(1)).subscribe(res=>{
      console.log('ADDITIONAL RISK', res);
    })
  }
}
