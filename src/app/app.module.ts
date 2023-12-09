import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

import {carInsuranceReducer} from "./pages/kendaraan/store-kendaraan/kendaraan.reducer";
import {updateMvInfoReducer} from "./pages/kendaraan/store-kendaraan/kendaraan.reducer";

import {StoreModule} from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const reducers = {
  carInsurance: carInsuranceReducer,
  mvinfoUpdate: updateMvInfoReducer
};

const keys = ['carInsurance', 'mvinfoUpdate']

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: keys, rehydrate: true })(reducer);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers,{ metaReducers: [localStorageSyncReducer]}),
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
