import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent{
  @Input() label: any = '';
  @Input() value: any = '';
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  isFocused: boolean = false;

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = this.value !== '';
    this.valueChange.emit(this.value); // Emit event saat blur terjadi
  }
}
