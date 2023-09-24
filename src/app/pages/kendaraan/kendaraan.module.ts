import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KendaraanPageRoutingModule } from './kendaraan-routing.module';

import {KendaraanPage} from './kendaraan.page';
import {HomePageModule} from "../home/home.module";
import {SearchableSelectComponent} from "../../components/utils/searchable-select/searchable-select.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        KendaraanPageRoutingModule,
        HomePageModule,
        SearchableSelectComponent
    ],
  declarations: [KendaraanPage]
})
export class KendaraanPageModule {}
