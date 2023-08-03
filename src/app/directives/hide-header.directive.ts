import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
})
export class HideHeaderDirective {
  @Input('appHideHeader') toolbar: any;
  private toolbarHeight = 44;
  constructor(private renderer: Renderer2, private domCtrl: DomController) {}

  // Get Scroll Event
  @HostListener('ionScroll', ['$event']) onContentScroll($event: any){
    const scrollTop = $event.detail.scrollTop;
    let newPosition = -(scrollTop/0.75);
    let newOpacity = 1 - (newPosition/ -this.toolbarHeight);
    if(newPosition < -this.toolbarHeight){
      newPosition = -this.toolbarHeight
    }
    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.toolbar, 'margin-top', `${newPosition}px`);
      this.renderer.setStyle(this.toolbar, 'opacity', newOpacity);
    })
    // console.log({
    //   "OLD POSITION :" : scrollTop,
    //   "NEW POSITION :" : newPosition,
    //   "NEW OPACITY :" : newOpacity,
    // });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // Read Hight Toolbar
    // console.log("TOOLBAR HEIGHT : ", this.toolbar);
    this.toolbar = this.toolbar.el;
    this.domCtrl.read(()=>{
      this.toolbarHeight = this.toolbar.clientHeight;
    });
  }

}
