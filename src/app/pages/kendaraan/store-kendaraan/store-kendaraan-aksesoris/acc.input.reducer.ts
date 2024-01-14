import { createReducer, on } from '@ngrx/store';
import * as AccessoryActions from './acc.input.actions';
import {AccState} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.state";

export const initialState: AccState = [];

export const accessoryReducer = createReducer(
  initialState,
  on(AccessoryActions.addAccessory, (state, { accessory }) => {
    const existingIndex = state.findIndex(item => item.name === accessory.name);

    if (existingIndex !== -1) {
      // Jika aksesoris sudah ada, perbarui nilainya
      const updatedState = [...state];
      updatedState[existingIndex] = { ...updatedState[existingIndex], ...accessory };
      return updatedState;
    } else {
      // Jika aksesoris belum ada, tambahkan yang baru
      return [...state, accessory];
    }
  }),
  on(AccessoryActions.removeAccessory, (state, { accessoryName }) => state.filter(item => item.name !== accessoryName))
);
