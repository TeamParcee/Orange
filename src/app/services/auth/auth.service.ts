import { FirestoreService } from './../firestore/firestore.service';
import { reject } from 'q';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;
  auth = firebase.auth();
  constructor(
    private fs: FirestoreService  
  ) { }


  loginFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider;
    this.auth.signInWithRedirect(provider);
  }
  linkFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();
    this.auth.currentUser.linkWithRedirect(provider);
  }
  getRedirectResults(){
   return new Promise((resolve, reject)=>{
      firebase.auth().getRedirectResult().then(function(result) {
          return resolve(result)
      }).catch((error)=> {
        return reject(error.message)
      });
    })
  }
  deleteAccount(){
    this.auth.currentUser.delete().then(()=>{
      this.fs.deleteCurrentUser(this.auth.currentUser.uid);
    })
    
    
  }
}
