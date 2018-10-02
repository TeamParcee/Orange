import { StorageService } from './../../services/storage/storage.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { FirestoreService } from './../../services/firestore/firestore.service';
import { Component } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../../services/location/location.service';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { NavController, ModalController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ImgViewerPage } from '../img-viewer/img-viewer.page';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  place;
  text;
  user;
  feed;
  watch;
  imgs = [];
  imgFiles = [];
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private photoViewer: PhotoViewer,
    private storage: StorageService,
    private navCtrl: NavController,
    private ls: Storage,
    private fs: FirestoreService,
    private location: LocationService,
    private geolocation: Geolocation) { }

  async ngOnInit() {

    this.user = await this.fs.getCurrentUser();
    await this.getCurrentLocation();
    this.checkPlaceSave();
  }

  getCurrentLocation() {
    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then(async (data) => {
        let place: any = await this.location.getAddress(data.coords);
        this.place = place;
        this.getFeed(place);
        this.checkUserIn(place);
        this.getUsers(place);
        resolve();
      })
    })
  }
  async send() {
    let imgsTags = document.getElementsByClassName("img");
    let imgs = [];
    for (let index = 0; index < imgsTags.length; index++) {
      let element = imgsTags[index];
      let src = element.getAttribute("src");
      let id = await this.fs.getNewId("places");
      let downloadURL = await this.storage.uploadFeedImage(src, this.place.placeid, id);
      imgs.push(downloadURL);
    }
    this.imgs = imgs;
    let text = document.getElementById("textbox").innerText;

    if (!text && !imgs) {
      return;
    }
    let message = {
      text: text,
      imgs: imgs,
      timestamp: new Date(),
      user: {
        uid: this.user.uid,
        photoURL: this.user.photoURL,
      },
      mid: ""
    }
    this.fs.sendMessage(message, this.place.placeid);


    document.getElementById("textbox").innerHTML = "";
    // document.getElementById("textbox").focus();
  }
  getFeed(place) {
    firebase.firestore().collection("/places/" + place.placeid + "/feed/")
      .orderBy("timestamp", "desc")
      .limit(15)
      .onSnapshot((feedSnap) => {
        let feed = [];
        feedSnap.forEach((message) => {
          feed.push(message.data())
        })
        this.feed = feed;
      })

  }
  checkUserIn(place) {
    if(this.user.checkdn){
      this.fs.deleteObj("/places/" + this.user.checkdn.placeid);
    }
    this.fs.updateObj("/users/" + this.user.uid, { checkdn: place });
    this.fs.checkUserIn("places/" + place.placeid + "/users/" + this.user.uid, this.user.uid)
  }
  getUsers(place) {
    firebase.firestore().collection("/places/" + place.placeid + "/users/")
      .onSnapshot((userSnap) => {
        this.place.users = userSnap.size;
      })
    this.fs.removeOnLogOff(this.user.uid, this.place.placeid);

  }
  viewCheckdnUsers() {

    this.ls.set('place', this.place);
    this.navCtrl.navigateForward("checkdn-users")
  }
  getPhoto(event) {

    let uploadedPic = event.target.files[0];
    let pic;
    let reader = new FileReader;
    reader.onloadend = function () {
      pic = reader.result;
      let img = document.createElement("img");
      img.src = pic;
      img.height = 100;
      img.width = 100;
      img.className = "img";
      document.getElementById("textbox").appendChild(img)
    }
    reader.readAsDataURL(uploadedPic)

  }

  async viewPhoto(url) {
    //this.photoViewer.show(url);
    let modal = await this.modalCtrl.create({
      component: ImgViewerPage,
    });
    this.ls.set("img", url);
    return await modal.present();
  }

  savePlace() {
    this.fs.setObj("/savedCheckdns/" + this.user.uid + "/places/" + this.place.placeid, this.place)
  }
  unSavePlace() {
    this.fs.deleteObj("/savedCheckdns/" + this.user.uid + "/places/" + this.place.placeid)
  }
  checkPlaceSave() {
    firebase.firestore().doc("/savedCheckdns/" + this.user.uid + "/places/" + this.place.placeid)
      .onSnapshot((placeSnap) => {
        if (placeSnap.exists) {
          this.user.saved = true;
        } else {
          this.user.saved = false;
        }
      })
  }
  viewProfilePage(uid){
    this.router.navigate(['view-profile', uid,]);
  }
}
