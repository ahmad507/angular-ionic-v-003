// mv-data.service.ts
import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { CarInsuranceState, MvInfoDetail } from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";
import {
  updateKendaraanData,
  updateMvInfoDetail
} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions";

@Injectable({
  providedIn: 'root',
})
export class MvDataService {
  constructor(private store: Store) {}

  updateMvInfoDetail(property: string, value: any) {
    const dataCarInfo = this.mvInfoDetailStore(property, value);
    this.store.dispatch(updateMvInfoDetail({ dataCarInfo }));
  }

  updateKendaraanPayload(property: string, value: any) {
    const newData = this.mvDataStore(property, value);
    this.store.dispatch(updateKendaraanData({ newData }));
  }

  private mvDataStore(property: string, value: any) {
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
      vmodel: '',
      vbrand: '',
      vfunction: "",
      vtype: "",
      vyear: 0,
      year_period: "",
      [property]: value
    };
    return newData;
  }

  private mvInfoDetailStore(property: string, value: any) {
    const dataCarInfo: Partial<MvInfoDetail> = {
      mainsi: '',
      vcode: '',
      unit_name: '',
      merek: '',
      unit_price_max: 0,
      unit_price: '',
      unit_price_min: 0,
      [property]: value
    };
    return dataCarInfo;
  }
}
