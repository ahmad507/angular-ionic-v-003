import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AccessoryActions from './acc.input.actions';
import { AccItems } from './acc.input.state';
import {
  selectAllAccessories
} from "@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.selector";

@Injectable({
  providedIn: 'root',
})
export class AccessoryService {
  constructor(private store: Store) {}
  addAccessory(accessory:AccItems) {
    this.store.dispatch(AccessoryActions.addAccessory({ accessory }));
  }
  deleteAccessory(){
    this.store.dispatch(AccessoryActions.removeAllAccessories());
  }
  removeAccessory(accessoryName:any) {
    this.store.dispatch(AccessoryActions.removeAccessory({ accessoryName }));
  }
  updateAllAccessory(accessories: any[]){
    this.store.dispatch(AccessoryActions.updateAllAccessories({accessories}));
  }
  getAllAccessories() {
    return this.store.select(selectAllAccessories).pipe();
  }
}
