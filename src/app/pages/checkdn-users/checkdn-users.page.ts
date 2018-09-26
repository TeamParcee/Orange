import { NavController } from '@ionic/angular';
import { FirestoreService } from './../../services/firestore/firestore.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-checkdn-users',
  templateUrl: './checkdn-users.page.html',
  styleUrls: ['./checkdn-users.page.scss'],
})
export class CheckdnUsersPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private fs: FirestoreService,
    private ls: Storage,
    private router: Router,
  ) { }

  async ngOnInit() {
  this.place = await this.ls.get('place');
  this.getUsers();
  }
  
  place;
  users;
  getUsers(){
    firebase.firestore().collection("places/" + this.place.placeid + "/users/").onSnapshot((uidSnap)=>{
      let uids = [];
      let users = [];
      uidSnap.forEach(async(result)=>{
        let user = await this.fs.getUser(result.data().uid);
        users.push(user)
      })
      this.users = users;
    })
  }

  viewProfilePage(uid){
    this.router.navigate(['view-profile', uid,]);
  }
}
