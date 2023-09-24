// carInsurance.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {CarInsuranceState} from "./kendaraan.state";

const selectCarInsuranceState = createFeatureSelector<CarInsuranceState>('carInsurance');

export const selectKendaraanData = createSelector(
  selectCarInsuranceState,
  (state: CarInsuranceState) => state
);
