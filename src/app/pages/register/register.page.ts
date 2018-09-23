import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email;
  password;
  displayName;
  photoURL ="../../../assets/imgs/photo_anonymous.png";
  constructor(
    private router: Router,
    private toastCtrl: ToastController) {
    
   }

  ngOnInit() {
  }

  create(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((result)=>{
      result.user.updateProfile({
        photoURL: this.photoURL,
        displayName: this.displayName
      })
      firebase.firestore().doc("/users/" + result.user.uid).set({
        displayName: this.displayName,
        uid: result.user.uid,
        photoURL: this.photoURL,
      })
      this.router.navigateByUrl("/home");
    }).catch(async(error)=>{
      let toast = await this.toastCtrl.create({
        message: error.message,
        duration: 2000,
        position: "bottom"
      });
      toast.present();
    })
  }
}
