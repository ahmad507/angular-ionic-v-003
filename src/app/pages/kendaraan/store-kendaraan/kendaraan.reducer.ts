// carInsurance.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {CarInsuranceState} from "./kendaraan.state";
import  * as kendaraanAction  from "./kendaraan.actions";

export const initialState: CarInsuranceState = {
  ctype: '',
  license: '',
  vfunction: '',
  vtype: '',
  vyear: 0,
  vcode: '',
  year_period: '',
  mainsi: 0,
  accesories_si: 0,
  accesories_detail: [],
  mainrisk: '',
  reg_no: '',
  addrisk: [],
  sortby: '',
  total_passenger: '',
  addrisk_all: [],
  addsi_all: [],
  addsi: [],
};

export const carInsuranceReducer = createReducer(
  initialState,
  on(kendaraanAction.updateKendaraanData, (state, { newData }) => {
    return {
      ...state,
      ctype: newData.ctype || state.ctype,
      license: newData.license || state.license,
      vfunction: newData.vfunction || state.vfunction,
      vtype: newData.vtype || state.vtype,
      vyear:newData.vyear || state.vyear,
      vcode: newData.vcode || state.vcode,
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
  })
);
