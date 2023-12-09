import { createFeatureSelector, createSelector } from '@ngrx/store';
import {CarInsuranceState, MvInfoDetail} from "./kendaraan.state";

const selectCarInsuranceState = createFeatureSelector<CarInsuranceState>('carInsurance');

export const selectKendaraanData = createSelector(
  selectCarInsuranceState, (state: CarInsuranceState) => state
);

export const selectKendaraanDataVtype = createSelector(
  selectCarInsuranceState, (state: CarInsuranceState) => state.vtype
);

export const selectKendaraanDataVTypeVYear = createSelector(
  selectCarInsuranceState, (state:CarInsuranceState) => ({
    mv_type: state.vtype,
    mv_year: state.vyear
  })
);

const selectMvInfoDetail = createFeatureSelector<MvInfoDetail[]>('mvinfoUpdate');
export const selectMvInfoDetailData = createSelector(selectMvInfoDetail, (state) => state);
