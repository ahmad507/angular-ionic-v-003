import {Directive, Inject, Injector, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl, FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  Validators
} from "@angular/forms";
import {distinctUntilChanged, startWith, Subject, takeUntil, tap} from "rxjs";

@Directive({
  selector: '[appControlValueAccessor]'
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor, OnInit {

  control: FormControl | undefined;
  isRequired: boolean  = false;

  private _isDisabled: boolean = false;
  private _destroy$ = new Subject<void>();
  private _onTouch!:() => T;

  constructor(
    @Inject(Injector) private injector: Injector,
  ) { }

  ngOnInit() {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);
      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector.get(FormGroupDirective).getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective).form as FormControl;
          break;
      }
    } catch (e) {
      this.control = new FormControl()
    }
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges.pipe(
      takeUntil(this._destroy$),
      startWith(this.control?.value),
      distinctUntilChanged(),
      tap((val)=>fn(val))
    ).subscribe(()=> this.control?.markAllAsTouched());
  }

  registerOnTouched(fn: ()=> T): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  writeValue(value: T): void {
    this.control ? this.control.setValue(value) : (this.control = new FormControl(value));
  }

}
