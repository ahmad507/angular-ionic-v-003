import { Component, OnInit} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { StatusBar, Style } from '@capacitor/status-bar';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    StatusBar.setOverlaysWebView({overlay:true})
    StatusBar.setStyle({ style: Style.Light });
  }

}
