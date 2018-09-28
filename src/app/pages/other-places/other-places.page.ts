import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-other-places',
  templateUrl: './other-places.page.html',
  styleUrls: ['./other-places.page.scss'],
})
export class OtherPlacesPage implements OnInit {

  otherPlaces;

  constructor(
    private navCtrl: NavController,
    private ls: Storage,
  ) { }

  async ngOnInit(
  ) {
    this.otherPlaces = await this.ls.get("otherPlaces");
    this.getUsers();
  }

  gotoPlace(place){
    this.ls.remove('otherPlace');
    this.ls.set('otherPlace', place);
    this.navCtrl.navigateForward('view-place');
  }
  getUsers() {
    this.otherPlaces.forEach(place => {
      firebase.firestore().collection("/places/" + place.placeid + "/users/")
      .onSnapshot((userSnap) => {
        place.users = userSnap.size;
      })
    });
  }
}
