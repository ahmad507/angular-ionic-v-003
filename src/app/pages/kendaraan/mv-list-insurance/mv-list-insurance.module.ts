import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MvListInsurancePageRoutingModule} from './mv-list-insurance-routing.module';

import {MvListInsurancePage} from './mv-list-insurance.page';
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";
import {HomePageModule} from "@src/app/pages/home/home.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MvListInsurancePageRoutingModule,
    ButtonComponent,
    HomePageModule
  ],
  declarations: [MvListInsurancePage]
})
export class MvListInsurancePageModule {
}
