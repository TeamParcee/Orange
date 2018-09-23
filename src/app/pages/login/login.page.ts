import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;

  constructor(
    private router: Router,
    private ls: Storage,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    this.email = await this.ls.get('email');
    console.log(this.email)
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then(()=>{
      this.ls.set("email", this.email);
      this.router.navigateByUrl('home');
    })
    .catch(async (error) => {
      let toast = await this.toastCtrl.create({
        message: error.message,
        duration: 2000,
        position: "bottom"
      });
      toast.present()
    })    
}
}
