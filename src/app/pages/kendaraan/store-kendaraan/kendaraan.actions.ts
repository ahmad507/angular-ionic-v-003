import { createAction, props } from '@ngrx/store';
import {CarInsuranceState, MvInfoDetail} from "./kendaraan.state";

export const updateKendaraanData = createAction(
  '[Car Insurance] Update Data',
  props<{ newData: Partial<CarInsuranceState> }>()
);

export const resetCarInsuranceData = createAction('[Car Insurance] Reset Data');
export const resetDataOnVTypeChange = createAction('[Car Insurance] Reset Data on VType Change');

export const updateMvInfoDetail = createAction('[Mv Info] Update MvInfo',
  props<{ dataCarInfo: Partial<MvInfoDetail>}>()
  );
export const resetMvInfoDetailData = createAction('[Mv Info] Reset Data');

export const updateAccesoriesSi = createAction(
  '[Kendaraan] Update Accesories Si',
  props<{ newAccesoriesSi: number }>()
);
