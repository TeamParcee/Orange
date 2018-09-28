import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-view-place',
  templateUrl: './view-place.page.html',
  styleUrls: ['./view-place.page.scss'],
})
export class ViewPlacePage implements OnInit {

  feed;
  users;
  place;
  user;
  constructor(
    private ls: Storage,
    private navCtrl: NavController,
  ) { }

  async ngOnInit() {
    this.place = await this.ls.get('otherPlace');
    this.getFeed(this.place);
    this.getUsers(this.place);
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

  getUsers(place) {
    firebase.firestore().collection("/places/" + place.placeid + "/users/")
      .onSnapshot((userSnap) => {
        this.place.users = userSnap.size;
      })
  }
  viewCheckdnUsers() {
    this.navCtrl.navigateForward("checkdn-users")
  }
}
