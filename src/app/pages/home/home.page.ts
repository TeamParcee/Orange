import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { FirestoreService } from './../../services/firestore/firestore.service';
import { Component } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationService } from '../../services/location/location.service';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
  constructor(
    private camera: Camera,
    private navCtrl: NavController,
    private ls: Storage,
    private fs: FirestoreService,
    private location: LocationService,
    private geolocation: Geolocation) { }

  async ngOnInit() {
    this.user = await this.fs.getCurrentUser();
    await this.getCurrentLocation();
  }

  getCurrentLocation() {
    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then(async (data) => {
        let place: any = await this.location.getAddress(data.coords);
        this.ls.set('place', place);
        let exists = await this.fs.checkExists("places/" + place.placeid);
        if (exists) {
          let p = await this.fs.getPlace("places/" + place.placeid);
          this.place = p;
          this.getFeed(place);
        } else {
          let p: any = await this.location.getPlaceDetails(place.placeid);
          this.place = {
            name: p.name,
            address: p.formatted_address,
            placeid: p.place_id
          }
          this.fs.createPlace("places/" + place.placeid, this.place);
          this.getFeed(place);
        }
        this.checkUserIn(place);
        this.getUsers(place)
      });
      return resolve()
    })


  }
  send() {
    let imgsTags = document.getElementsByClassName("img");
    let imgs = [] 
    for (let index = 0; index < imgsTags.length; index++) {
      let element = imgsTags[index];
      imgs.push(element.getAttribute("src"))
      
    }
    this.imgs = imgs;
    let text = document.getElementById("textbox").innerText;

    if (!text || !imgs) {
      return;
    }
    let message = {
      text: text,
      imgs: imgs,
      timestamp: new Date(),
      user: this.user.uid,
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
    this.navCtrl.navigateForward("checkdn-users")
  }
  getPhoto() {
    let options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      allowEdit: true,
      targetWidth: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{
      let img = document.createElement("img");
      img.src = 'data:image/jpeg;base64,' + imageData;
      img.className = "img";
      document.getElementById("textbox").appendChild(img)

    })

  }
}
