import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private auth: AuthService,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  async confirmDelete(){
    let alert = await this.alertCtrl.create({
      header: "Delete Account",
      message: "Are you sure you want to delete your account? This can not be undone.",
      buttons: [{
        text: "Cancel"
      },{
        text: "Delete Account",
        handler: ()=>{
          this.deleteAccount()
        }
      }],
    })
    alert.present()
  }

  deleteAccount(){
    this.auth.deleteAccount();
  }
  signOut(){
    firebase.auth().signOut().then(()=>{
    })
  }
}
