import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicImageViewerModule } from 'ionic-img-viewer';

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyA0cr5s_hTaHgCrxQz4O3zutU1Mcq-uSZA",
  authDomain: "checkdn-914.firebaseapp.com",
  databaseURL: "https://checkdn-914.firebaseio.com",
  projectId: "checkdn-914",
  storageBucket: "checkdn-914.appspot.com",
  messagingSenderId: "118221588888"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicImageViewerModule,
    BrowserModule, 
    IonicModule.forRoot(),    
    IonicStorageModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
