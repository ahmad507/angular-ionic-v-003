import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import {FileOpener} from '@awesome-cordova-plugins/file-opener/ngx';

import {
  carInsuranceReducer,
  updateCoveragesListReducer,
  updateMvInfoReducer
} from './pages/kendaraan/store-kendaraan/kendaraan.reducer';
import {accessoryReducer} from '@src/app/pages/kendaraan/store-kendaraan/store-kendaraan-aksesoris/acc.input.reducer';

import {StoreModule} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

const reducers = {
  carInsurance: carInsuranceReducer,
  mvinfoUpdate: updateMvInfoReducer,
  accessories: accessoryReducer,
  mvCoverageUpdate: updateCoveragesListReducer,
};

const keys = ['carInsurance', 'mvinfoUpdate', 'accessories', 'mvCoverageUpdate'];

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: keys, rehydrate: true })(reducer);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers: [localStorageSyncReducer] }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
