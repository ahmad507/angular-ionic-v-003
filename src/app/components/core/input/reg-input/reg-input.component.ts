import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import {InputComponent} from "@src/app/components/core/input/input/input.component";
import {ControlValueAccessorDirective} from "@src/app/directives/control-value-accessor.directive";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

type inputType =
  'button' |
  'checkbox' |
  'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';


@Component({
  selector: 'app-reg-input',
  standalone:true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './reg-input.component.html',
  styleUrls: ['./reg-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> InputComponent),
      multi: true
    }
  ]
})
export class RegInputComponent<T> extends ControlValueAccessorDirective<T>{
  @Input() inputId = "";
  @Input() label = "";
  @Input() type: inputType = 'text';
  @Input() value: any = '';
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

