import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { DisableButtonDirective } from './disable-button.directive';
import { ShowAccessoriesDirective } from './show-accessories.directive';



@NgModule({
  declarations: [
    HideHeaderDirective,
    DisableButtonDirective,
    ShowAccessoriesDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HideHeaderDirective,
    DisableButtonDirective,
    ShowAccessoriesDirective,
  ]
})
export class SharedDirectivesModule { }
