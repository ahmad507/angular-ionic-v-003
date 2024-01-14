import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyPageRoutingModule } from './policy-routing.module';

import { PolicyPage } from './policy.page';
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";
import {HomePageModule} from "@src/app/pages/home/home.module";
import {RegInputComponent} from "@src/app/components/core/input/reg-input/reg-input.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyPageRoutingModule,
    ReactiveFormsModule,
    ButtonComponent,
    HomePageModule,
    RegInputComponent,
  ],
	declarations: [PolicyPage]
})
export class PolicyPageModule {}
