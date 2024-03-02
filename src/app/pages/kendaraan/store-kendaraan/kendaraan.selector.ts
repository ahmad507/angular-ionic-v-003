import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CarInsuranceState, MvInfoDetail, RESPONSE_COVERAGES_LIST} from "./kendaraan.state";

const selectCarInsuranceState = createFeatureSelector<CarInsuranceState>('carInsurance');
export const selectKendaraanData = createSelector(
  selectCarInsuranceState, (state: CarInsuranceState) => state
);
export const selectKendaraanDataVtype = createSelector(
  selectCarInsuranceState, (state: CarInsuranceState) => state.vtype
);
export const selectKendaraanDataVTypeVYear = createSelector(
  selectCarInsuranceState, (state: CarInsuranceState) => ({
    mv_type: state.vtype,
    mv_year: state.vyear
  })
);
export const selectMvInfoDetail = createFeatureSelector<MvInfoDetail[]>('mvinfoUpdate');
export const selectMvInfoDetailData = createSelector(selectMvInfoDetail, (state) => state);

export const selectMvDataCoverage = createFeatureSelector<RESPONSE_COVERAGES_LIST[]>('mvCoverageUpdate');
export const selectDataCoverageList = createSelector(selectMvDataCoverage, (state) => state);
