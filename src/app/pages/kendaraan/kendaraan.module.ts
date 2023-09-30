import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KendaraanPageRoutingModule } from './kendaraan-routing.module';

import {KendaraanPage} from './kendaraan.page';
import {HomePageModule} from "../home/home.module";
import {SearchableSelectComponent} from "../../components/utils/searchable-select/searchable-select.component";
import {NasabahComponent} from "../../components/core/nasabah/nasabah.component";
import {MvFunctionComponent} from "../../components/core/mv/mv-function/mv-function.component";
import {MvTypeComponent} from "@src/app/components/core/mv/mv-type/mv-type.component";
import {MvYearsComponent} from "@src/app/components/core/mv/mv-years/mv-years.component";
import {MvModelBrandComponent} from "@src/app/components/core/mv/mv-model-brand/mv-model-brand.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        KendaraanPageRoutingModule,
        HomePageModule,
        SearchableSelectComponent,
        NasabahComponent,
        MvFunctionComponent,
        MvYearsComponent,
        MvModelBrandComponent
    ],
    declarations: [KendaraanPage, MvTypeComponent]
})
export class KendaraanPageModule {}
