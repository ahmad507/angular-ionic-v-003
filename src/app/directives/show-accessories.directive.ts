import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowAccessories]',
})
export class ShowAccessoriesDirective {
  @Input('appShowAccessories') set appShowAccessories(value: boolean) {
    console.log('VALUE', value);
    if (!value) {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    }
  }
  constructor(private renderer: Renderer2, private el: ElementRef) {}
}
