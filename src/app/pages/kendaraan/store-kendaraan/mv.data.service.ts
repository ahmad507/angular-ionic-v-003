// mv-data.service.ts
import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import { CarInsuranceState, MvInfoDetail } from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.state";
import {
  updateAccesoriesSi,
  updateKendaraanData,
  updateMvInfoDetail
} from "@src/app/pages/kendaraan/store-kendaraan/kendaraan.actions";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import apiConfig from "@src/config/apiConfig";
import {RESPONSE_RISK} from "@src/app/pages/kendaraan/kendaraan.page";

@Injectable({
  providedIn: 'root',
})
export class MvDataService {
  headers = new HttpHeaders({ 'asri-api-key': apiConfig.apiKey.asri_api_key });
  mvRiskENDPOINT = '/API_STAGE_1/v01/mv/coverage/listMainRisk';
  mvAdditionalRiskENDPOINT = '/API_STAGE_1/v01/mv/coverage/listAdditionalRisk';

  constructor(private store: Store, private httpClient: HttpClient) {}

  updateMvInfoDetail(property: string, value: any) {
    const dataCarInfo = this.mvInfoDetailStore(property, value);
    this.store.dispatch(updateMvInfoDetail({ dataCarInfo }));
  }

  updateKendaraanPayload(property: string, value: any) {
    const newData = this.mvDataStore(property, value);
    this.store.dispatch(updateKendaraanData({ newData }));
  }

  updateAccesoriesSiS(newAccesoriesSi:number){
    this.store.dispatch(updateAccesoriesSi({newAccesoriesSi}))
  }

  mvDataStore(property: string, value: any) {
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
      year_period: "1",
      [property]: value
    };
    return newData;
  }

  mvInfoDetailStore(property: string, value: any) {
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

  mvMainRisk(){
    return this.httpClient.get<RESPONSE_RISK>(this.mvRiskENDPOINT, {headers: this.headers});
  }

  mvAdditionalRisk(param:any){
    return this.httpClient.get(this.mvAdditionalRiskENDPOINT,{headers: this.headers, params:param});
  }

}
