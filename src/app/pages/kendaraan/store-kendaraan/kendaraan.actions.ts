import { createAction, props } from '@ngrx/store';
import {CarInsuranceState} from "./kendaraan.state";

export const updateKendaraanData = createAction(
  '[Car Insurance] Update Data',
  props<{ newData: Partial<CarInsuranceState> }>()
);
