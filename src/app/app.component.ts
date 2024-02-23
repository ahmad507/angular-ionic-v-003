import { initialState } from './pages/kendaraan/store-kendaraan/kendaraan.state';
import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {}

  initialize = () => {
    this.platform.ready().then((res: any) => {
      if (res !== 'dom') {
        StatusBar.setOverlaysWebView({ overlay: true });
        StatusBar.setStyle({ style: Style.Light });
      }
    });
  };

  ngOnInit() {
    this.initialize();
  }
}
