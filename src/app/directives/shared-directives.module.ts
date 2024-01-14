import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { DisableButtonDirective } from './disable-button.directive';
import { ShowAccessoriesDirective } from './show-accessories.directive';
import { ControlValueAccessorDirective } from './control-value-accessor.directive';



@NgModule({
  declarations: [
    HideHeaderDirective,
    DisableButtonDirective,
    ShowAccessoriesDirective,
    ControlValueAccessorDirective,
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
