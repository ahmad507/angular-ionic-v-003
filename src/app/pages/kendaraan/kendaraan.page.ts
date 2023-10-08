import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { informasiNasabah, informasiKendaraan } from "./data/data.simulasi";
import {Store} from "@ngrx/store";
import {CarInsuranceState} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";
import {updateKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions";

@Component({
  selector: 'app-kendaraan',
  templateUrl: './kendaraan.page.html',
  styleUrls: ['./kendaraan.page.scss'],
})
export class KendaraanPage implements OnInit {
  inputDetail: any = informasiNasabah;
  inputDetail_2: any = informasiKendaraan;
  TIPE_NASABAH: string = '';
  PENGGUNAAN_KENDARAAN: string = '';
  JENIS_KENDARAAN: string = '';
  TAHUN_KENDARAAN: string = '';
  KODE_PLAT_KENDARAAN: string = '';
  MV_TYPE: string = '';
  MV_YEAR: number = 0;


  constructor(
    private router : Router,
    private store : Store,
  ) {}

  ngOnInit() {
  }

  gotoHome() {
    this.router.navigate(['/main/home']);
  }

  updateKendaraanPayload(property: string, value: any) {
    const newData: Partial<CarInsuranceState> = {
      accesories_detail: [],
      accesories_si: 0,
      addrisk: [],
      addrisk_all: [],
      addsi: [],
      addsi_all: [],
      ctype: "",
      license: "",
      mainrisk: "",
      mainsi: 0,
      reg_no: "",
      sortby: "",
      total_passenger: "",
      vcode: "",
      vfunction: "",
      vtype: "",
      vyear: 0,
      year_period: "",
      [property]: value };
    this.store.dispatch(updateKendaraanData({ newData }));
  }

  async getDataNasabah($event: string) {
    this.updateKendaraanPayload('ctype', $event);
  }

  async getDataMvFunction($event: string) {
    this.updateKendaraanPayload('vfunction', $event);
  }

  async getDataMvType($event: string) {
    this.MV_TYPE = $event;
    this.updateKendaraanPayload('vtype', $event);
  }

  async getDataMvYear($event: number) {
    this.MV_YEAR = $event;
    this.updateKendaraanPayload('vyear', $event);
  }

  async getDataMvLicense($event: any) {
    const dataLicense = [];
    dataLicense.push($event);
    dataLicense.forEach((res)=>{
      this.updateKendaraanPayload('license', res.id);
    })
  }

  CheckParamMV() {
    if (this.MV_TYPE === '' || this.MV_YEAR === 0){
      return 'hidden';
    } else{
      return 'block';
    }
  }

  async getDataMvMerekModel($event: any) {
    const mvInfo = [];
    mvInfo.push({...$event});
    mvInfo.map((res)=>{
      this.updateKendaraanPayload('vcode', res.vcode);
      this.updateKendaraanPayload('mainsi', res.mainsi);
      if (res.accesories_si === undefined){
        this.updateKendaraanPayload('accesories_si', 0);
      } else {
        this.updateKendaraanPayload('accesories_si', res.accesories_si);
      }
    });
  }
}
