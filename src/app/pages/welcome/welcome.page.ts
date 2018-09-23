import { FirestoreService } from './../../services/firestore/firestore.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private fs: FirestoreService,
    private router: Router,
    private auth: AuthService,) { 
  }

  ngOnInit() {
    this.getRedirct()
  }

  facebookLogin(){
    this.auth.loginFacebook();
  }
  async getRedirct(){
    let result:any = await this.auth.getRedirectResults();
    if(result.user){
      let exists = await this.fs.checkExists("/users/" + result.user.uid);
      if(!exists){
        firebase.firestore().doc("/users/" + result.user.uid).set({
          displayName: result.user.displayName,
          uid: result.user.uid,
          photoURL: result.user.photoURL,
        })
      }
      this.router.navigateByUrl('home')
    }
  }
}
