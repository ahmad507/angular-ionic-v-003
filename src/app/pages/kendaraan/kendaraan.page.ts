import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { informasiNasabah, informasiKendaraan } from "./data/data.simulasi";
import {updateKendaraanData} from "./store-kendaraan/kendaraan.actions";
import {Store} from "@ngrx/store";
import {CarInsuranceState} from "./store-kendaraan/kendaraan.state";

@Component({
  selector: 'app-kendaraan',
  templateUrl: './kendaraan.page.html',
  styleUrls: ['./kendaraan.page.scss'],
})
export class KendaraanPage implements OnInit {
  inputDetail: any = informasiNasabah;
  inputDetail_2: any = informasiKendaraan;
  //  DATA MODEL
  TIPE_NASABAH: string = '';
  PENGGUNAAN_KENDARAAN: string = '';
  JENIS_KENDARAAN: string = '';
  TAHUN_KENDARAAN: string = '';
  KODE_PLAT_KENDARAAN: string = '';


  constructor(
    private router : Router,
    private store: Store
  ) {}

  ngOnInit() {
  }

  gotoHome() {
    this.router.navigate(['/main/home']);
  }

  handleTipeNasabahSelected($event: string) {
    if ($event === '1'){
      this.TIPE_NASABAH = 'Perorangan'
      this.inputDetail[0].iconL = 'person'
    } else {
      this.TIPE_NASABAH = 'Perusahaan'
      this.inputDetail[0].iconL = 'business-outline'
    }
    this.inputDetail[0].label = this.TIPE_NASABAH;
  }

  handleTipePenggunaSelected($event: string) {
    if ($event === 'P'){
      this.PENGGUNAAN_KENDARAAN = 'Pribadi'
      this.inputDetail[1].iconL = 'key'
    } else {
      this.PENGGUNAAN_KENDARAAN = 'Disewakan'
      this.inputDetail[1].iconL = 'calculator'
    }
    this.inputDetail[1].label = this.PENGGUNAAN_KENDARAAN;
  }

  handleTipeKendaraanSelected($event: string) {
    switch ($event){
      case 'A':
        this.JENIS_KENDARAAN = 'Sedan, Minibus, Jeep, City Car';
        this.inputDetail_2[0].iconL = 'car';
        break;
      case 'B':
        this.JENIS_KENDARAAN = 'Bus';
        this.inputDetail_2[0].iconL = 'bus';
        break;
      case 'D':
        this.JENIS_KENDARAAN = 'Sepeda Motor';
        this.inputDetail_2[0].iconL = 'bicycle';
        break;
      default:
        this.JENIS_KENDARAAN = 'Sedan, Minibus, Jeep, Citi Car';
        this.inputDetail_2[0].iconL = 'car';
    }
    this.inputDetail_2[0].label = this.JENIS_KENDARAAN;
  }

  handleTahunKendaraanSelected($event: string) {
    this.TAHUN_KENDARAAN = $event;
    this.inputDetail_2[1].label = 'Tahun Produksi : ' + $event.toString();
  }
}