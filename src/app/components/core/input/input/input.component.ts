import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import {InputCurrencyDirective} from "@src/app/directives/input-currency.directive";

type inputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InputCurrencyDirective
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
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() value: any = '';
  @Input() type: inputType = 'text';
  @Input() disabled: boolean = false;
  @Input() shouldFormat: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  isFocused: boolean = false;

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = this.value !== '';
    this.valueChange.emit(this.value);
  }

  // Implementasi ControlValueAccessor
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.valueChange.subscribe(fn);
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
