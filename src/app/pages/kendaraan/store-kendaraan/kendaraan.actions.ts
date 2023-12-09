import { createAction, props } from '@ngrx/store';
import {CarInsuranceState} from "./kendaraan.state";

export const updateKendaraanData = createAction(
  '[Car Insurance] Update Data',
  props<{ newData: Partial<CarInsuranceState> }>()
);

export const resetCarInsuranceData = createAction('[Car Insurance] Reset Data');

export const resetDataOnVTypeChange = createAction('[Car Insurance] Reset Data on VType Change');
