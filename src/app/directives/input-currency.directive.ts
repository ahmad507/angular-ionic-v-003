import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appInputCurrency]'
})
export class InputCurrencyDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  @HostListener('input', ['$event']) onInput(): void {
    const inputElement = this.el.nativeElement;
    const inputValue = inputElement.value;
    const formattedValue = this.formatAngka(inputValue);
    this.renderer.setProperty(inputElement, 'value', formattedValue);
  }

  private formatAngka(angka: string): string {
    const numericValue = angka.replace(/[^0-9]/g, '');
    return Number(numericValue).toLocaleString();
  }

}
