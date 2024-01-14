import { createFeatureSelector, createSelector } from '@ngrx/store';
import {AccState} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.state";

export const selectAccessoryState = createFeatureSelector<AccState>('accessories');

export const selectAllAccessories = createSelector(selectAccessoryState, (state: AccState) => state);
