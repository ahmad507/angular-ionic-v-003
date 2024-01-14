import { createAction, props } from '@ngrx/store';
import {AccItems} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.state";

export const addAccessory = createAction('[Accessory] Add Accessory', props<{ accessory: AccItems }>());
export const removeAccessory = createAction('[Accessory] Remove Accessory', props<{ accessoryName: string }>());
