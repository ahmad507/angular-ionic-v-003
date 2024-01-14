import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyPageRoutingModule } from './policy-routing.module';

import { PolicyPage } from './policy.page';
import {ButtonComponent} from "@src/app/components/core/buttons/button/button.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyPageRoutingModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  declarations: [PolicyPage]
})
export class PolicyPageModule {}
