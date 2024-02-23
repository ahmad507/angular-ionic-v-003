import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SpacerComponent } from '../../components/utils/spacer/spacer/spacer.component';
import { HomePageRoutingModule } from './home-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [SpacerComponent],
  declarations: [HomePage, SpacerComponent],
})
export class HomePageModule {}
