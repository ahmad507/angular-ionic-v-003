import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective {
  @Input('appHideHeader') toolbar: any;
  private toolbarHeight = 60;

  private scrollSubject = new Subject<number>();

  constructor(private renderer: Renderer2, private domCtrl: DomController) {}

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const scrollTop = $event.detail.scrollTop;
    this.scrollSubject.next(scrollTop);
    this.scrollSubject.pipe(
      throttleTime(16), // Adjust the throttle time as needed
      distinctUntilChanged()
    ).subscribe((scrollTop) => {
      let newPosition = -(scrollTop / 0.75);
      let newOpacity = 1 - newPosition / -this.toolbarHeight;

      if (newPosition < -this.toolbarHeight) {
        newPosition = -this.toolbarHeight;
      }

      this.domCtrl.write(() => {
        requestAnimationFrame(() => {
          this.renderer.setStyle(this.toolbar, 'margin-top', `${newPosition}px`);
          this.renderer.setStyle(this.toolbar, 'opacity', newOpacity);
        });
      });
    });
  }

  ngOnInit(): void {
    this.toolbar = this.toolbar.el;
    this.domCtrl.read(() => {
      this.toolbarHeight = this.toolbar.clientHeight;
    });
  }
}
