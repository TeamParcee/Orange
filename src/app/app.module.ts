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
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ImgViewerPage } from './pages/img-viewer/img-viewer.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicImageLoader } from 'ionic-image-loader';

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
  declarations: [AppComponent, ImgViewerPage], 
  entryComponents: [ImgViewerPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),  
    IonicImageLoader.forRoot(),  
    IonicStorageModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    InAppBrowser,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoViewer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
