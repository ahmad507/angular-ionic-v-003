import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective {
  @Input('appHideHeader') toolbar: any;
  private toolbarHeight = 44;
  private scrollSubject = new Subject<number>();

  constructor(private renderer: Renderer2, private domCtrl: DomController) {}

  @HostListener('ionScroll', ['$event'])
  onContentScroll($event: any) {
    const scrollTop = $event.detail.scrollTop;
    this.scrollSubject.next(scrollTop);

    this.scrollSubject
      .pipe(throttleTime(100), distinctUntilChanged())
      .subscribe((scrollTop) => {
        let newPosition = -(scrollTop / 0.1);
        this.domCtrl.write(() => {
          if (newPosition < -this.toolbarHeight) {
            this.renderer.setStyle(this.toolbar, 'opacity', 0);
            this.renderer.setStyle(
              this.toolbar,
              'transition',
              'transform 0.3s, opacity 0.3s'
            );
          } else {
            this.renderer.setStyle(this.toolbar, 'opacity', 1);
            this.renderer.setStyle(
              this.toolbar,
              'transition',
              'transform 0.3s, opacity 0.3s'
            );
          }
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
