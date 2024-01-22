import {createReducer, on} from '@ngrx/store';
import {initialState, initialStateMvInfo} from "./kendaraan.state";
import * as kendaraanAction from "./kendaraan.actions";
export const carInsuranceReducer = createReducer(
  initialState,
  on(kendaraanAction.updateKendaraanData, (state, { newData }) => {
    return {
      ...state,
      ctype: newData.ctype || state.ctype,
      license: newData.license || state.license,
      license_region: newData.license_region || state.license_region,
      vfunction: newData.vfunction || state.vfunction,
      vtype: newData.vtype || state.vtype,
      vyear:newData.vyear || state.vyear,
      vcode: newData.vcode || state.vcode,
      vmodel: newData.vmodel || state.vmodel,
      vbrand: newData.vbrand || state.vbrand,
      year_period: newData.year_period || state.year_period,
      mainsi:newData.mainsi || state.mainsi,
      accesories_si:newData.accesories_si || state.accesories_si,
      accesories_detail: newData.accesories_detail || state.accesories_detail,
      mainrisk: newData.mainrisk || state.mainrisk,
      reg_no: newData.reg_no || state.reg_no,
      addrisk: newData.addrisk || state.addrisk,
      sortby: newData.sortby || state.sortby,
      total_passenger: newData.total_passenger || state.total_passenger,
      addrisk_all: newData.addrisk_all || state.addrisk_all,
      addsi_all: newData.addsi_all || state.addrisk_all,
      addsi: newData.addsi || state.addsi
    };
  }),
  on(kendaraanAction.resetCarInsuranceData, () => initialState),
  on(kendaraanAction.resetDataOnVTypeChange, (state) =>{
    return {
      ...state,
      vcode: '',
      vmodel: '',
      vbrand: '',
      mainsi: 0,
      vyear: 0,
      accesories_si:0,
      accesories_detail:[]
    }
  }),
  on(kendaraanAction.updateAccesoriesSi , (state, { newAccesoriesSi }) => {
    return {
      ...state,
      accesories_si: newAccesoriesSi
    };
  })
);
export const updateMvInfoReducer = createReducer(
  initialStateMvInfo,
  on(kendaraanAction.updateMvInfoDetail, (state, {dataCarInfo})=>{
    return {
      mainsi: dataCarInfo.mainsi || state.mainsi,
      vcode: dataCarInfo.vcode || state.vcode,
      unit_name: dataCarInfo.unit_name || state.unit_name,
      merek: dataCarInfo.merek || state.merek,
      unit_price_max: dataCarInfo.unit_price_max || state.unit_price_max,
      unit_price: dataCarInfo.unit_price || state.unit_price,
      unit_price_min: dataCarInfo.unit_price_min || state.unit_price_min,
    }
  }),
  on(kendaraanAction.resetMvInfoDetailData, () => initialStateMvInfo),
)
