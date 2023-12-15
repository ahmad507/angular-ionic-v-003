import {Directive, Input, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDisableButton]'
})
export class DisableButtonDirective {
  @Input('appDisableButton') set appDisableButton(value: boolean) {
    if (value) {
      this.renderer.setStyle(this.el.nativeElement, 'display','none');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display','block');
    }
  }
  constructor(private renderer: Renderer2, private el: ElementRef) { }
}
