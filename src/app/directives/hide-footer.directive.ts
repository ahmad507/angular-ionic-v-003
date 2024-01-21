import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[appHideFooter]'
})
export class HideFooterDirective {
  @Input('appHideFooter') footer: any;
  private footerHeight = 44;
  private scrollSubject = new Subject<number>();
  private lastScrollTop = 0;

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController) {}

  @HostListener('ionScroll', ['$event'])
  onContentScroll($event: any) {
    const scrollTop = $event.detail.scrollTop;
    this.scrollSubject.next(scrollTop);
    this.scrollSubject
      .pipe(
        throttleTime(50),
        distinctUntilChanged()
      ).subscribe((scrollTop) => {
      let newPosition = -(scrollTop / 0.1);
      this.domCtrl.write(() => {
        if (newPosition < -this.footerHeight) {
          this.renderer.setStyle(this.footer, 'visibility', 'visible');
          this.renderer.setStyle(this.footer, 'transition', 'transform 0.3s, opacity 0.3s');
        } else {
          this.renderer.setStyle(this.footer, 'visibility', 'hidden');
          this.renderer.setStyle(this.footer, 'transition', 'transform 0.3s, opacity 0.3s');
        }

        this.lastScrollTop = scrollTop;
      });
    });
  }

  ngOnInit(): void {
    this.footer = this.footer.el;
    this.domCtrl.read(() => {
      this.footerHeight = this.footer.clientHeight;
    });
  }
}
