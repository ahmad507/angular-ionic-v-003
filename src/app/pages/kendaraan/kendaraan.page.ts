import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { informasiNasabah, informasiKendaraan } from "./data/data.simulasi";
import {Store} from "@ngrx/store";
import {CarInsuranceState} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";
import {resetCarInsuranceData, updateKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions";
import {selectKendaraanData} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.selector";

export interface MvInfo {
  mainsi: string;
  vcode: string;
  unit_name: string;
  merek: string;
}

@Component({
  selector: 'app-kendaraan',
  templateUrl: './kendaraan.page.html',
  styleUrls: ['./kendaraan.page.scss'],
})
export class KendaraanPage implements OnInit {
  @Input() mv_price: string = '0';

  inputDetail: any = informasiNasabah;
  inputDetail_2: any = informasiKendaraan;
  TIPE_NASABAH: string = '';
  PENGGUNAAN_KENDARAAN: string = '';
  JENIS_KENDARAAN: string = '';
  TAHUN_KENDARAAN: string = '';
  KODE_PLAT_KENDARAAN: string = '';
  MV_TYPE: string = '';
  MV_YEAR: number = 0;
  MV_INFO_DATA: any = [];
  MV_CODE: string = '';
  private mv_price_max: number = 0;
  private mv_price_min: number = 0;
  isButtonDisabled: boolean = true;
  isMVCAR: boolean = true;


  constructor(
    private router : Router,
    private store : Store,
  ) {}

  ngOnInit() {
    this.isButtonDisabled = false;
    this.isButtonDisabled = false;
  }

  gotoHome() {
    this.store.dispatch(resetCarInsuranceData());
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
      license_region: "",
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
    if(this.MV_TYPE === 'A'){
      this.isMVCAR = true;
    } else {
      this.isMVCAR = false;
    }
    this.updateKendaraanPayload('vtype', $event);
    this.MV_YEAR = 0;
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
      this.updateKendaraanPayload('license_region', res.text);
    })
  }

  CheckParamMV() {
    if (this.MV_TYPE === '' || this.MV_YEAR === 0){
      return 'hidden';
    } else{
      return 'block';
    }
  }

  CheckParamMV2() {
    if (this.MV_INFO_DATA.length === 0){
      return 'hidden';
    } else{
      return 'block';
    }
  }

  async getDataMvMerekModel($event: any) {
    this.extractDataMv($event);
    const mvInfo = [];
    mvInfo.push({...$event});
    mvInfo.map((res)=>{
      this.updateKendaraanPayload('vcode', res.vcode);
      this.MV_CODE = res.vcode;
    });
  }

  checkInput($event: any) {
    const inputValue = $event.target.value;
    return this.validatePrice(inputValue);
  }

  validatePrice(unit_price: any) {
    let dataPrice = parseInt(unit_price.replace(/,/g, ''), 10);
    this.isButtonDisabled = isNaN(dataPrice) || dataPrice > this.mv_price_max || dataPrice < this.mv_price_min || (dataPrice !== 0 && (dataPrice > this.mv_price_max || dataPrice < this.mv_price_min));
    this.mv_price = isNaN(dataPrice) ? unit_price : dataPrice.toLocaleString();
    this.updateKendaraanPayload('mainsi', this.mv_price);
  }

  private extractDataMv($event: any) {
    const dataCarinfoTemp = [];
    dataCarinfoTemp.push($event);
    const dataCarInfo = dataCarinfoTemp.map((item: MvInfo) => {
      const mainsi = parseFloat(item.mainsi.replace(/,/g, ''));
      const unit_price_max = mainsi + (mainsi * 0.1);
      this.mv_price_max = unit_price_max;
      const unit_price = mainsi.toLocaleString();
      this.mv_price = item.mainsi;
      this.updateKendaraanPayload('mainsi', item.mainsi);
      const unit_price_min = mainsi - (mainsi * 0.1);
      this.mv_price_min = unit_price_min;
      return {
        ...item,
        unit_price_max: unit_price_max,
        unit_price: unit_price,
        unit_price_min: unit_price_min,
      };
    });
    this.MV_INFO_DATA = dataCarInfo;
  }

  checkInput2($event: any) {
    const inputValue = parseInt($event.target.value.replace(/,/g, ''), 10);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 1000000000000) {
      this.mv_price = $event.target.value;
    } else {
      this.mv_price = '0';
    }
  }
}
