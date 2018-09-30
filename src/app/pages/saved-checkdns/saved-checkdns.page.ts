import { AlertController, NavController } from '@ionic/angular';
import { FirestoreService } from './../../services/firestore/firestore.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import 'firebase/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-saved-checkdns',
  templateUrl: './saved-checkdns.page.html',
  styleUrls: ['./saved-checkdns.page.scss'],
})
export class SavedCheckdnsPage implements OnInit {

  places;
  user;
  constructor(
    private ls: Storage,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private fs: FirestoreService,
  ) { 
    
  }

  async ngOnInit() {
    this.user = await this.fs.getCurrentUser();
    this.places = await this.getSavedCheckdns();
    this.getUsers();
    
  }
  gotoPlace(place){
    this.ls.remove('otherPlace');
    this.ls.set('otherPlace', place);
    this.navCtrl.navigateForward('view-place');
  }
  getUsers() {
    this.places.forEach(place => {
      firebase.firestore().collection("/places/" + place.placeid + "/users/")
      .onSnapshot((userSnap) => {
        place.users = userSnap.size;
      })
    });
  }
  getSavedCheckdns(){
    return new Promise((resolve)=>{
      firebase.firestore().collection("savedCheckdns/" + this.user.uid + "/places/")
      .onSnapshot((savedSnap)=>{
        let places = [];
        savedSnap.forEach((place)=>{
          places.push(place.data())
        })
        return resolve (places);
      })
    })
  }
  removeSaveCheckdn(place){
    firebase.firestore().doc("savedCheckdns/" + this.user.uid + "/places/" + place.placeid)
    .delete();
  }
  async confirmRemove(place){
    let alert = await this.alertCtrl.create({
      header: "Remove Saved Place",
      message: "Are you sure you want to remove this saved place?",
      buttons: [{
        text: "Cancel",
      },{
        text: "Remove",
        handler: ()=>{
          this.removeSaveCheckdn(place)
        }
      }]
    });
    alert.present();
  }
}
