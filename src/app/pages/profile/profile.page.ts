import { FirestoreService } from './../../services/firestore/firestore.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthService } from '../../services/auth/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SettingsPage } from '../settings/settings.page';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private camera: Camera,
    private navCtrl: NavController,
    private auth: AuthService,
    private fs: FirestoreService,
  ) { }

  async ngOnInit() {
    this.user = await this.fs.getCurrentUser();
    this.getRedirect();
    let imgProfile = document.getElementById("profilePic");
    imgProfile.style.background = "url(" + this.user.photoURL + ") no-repeat center";
  }

  fbExample;
  instaExample;
  user;
  edit; 
  photoURL;
  coverURL;
  editCover;
  editPhoto;
 
  linkFacebook(){
    this.auth.linkFacebook();
  }
  getRedirect(){
    this.auth.getRedirectResults().then((result:any)=>{
      if(result.additionalUserInfo){
        firebase.firestore().doc("users/" + this.user.uid).update({
          facebookId: result.additionalUserInfo.profile.id
        })
      }
    })
  }
 
  editPage(){
    this.navCtrl.navigateForward("edit-profile")
  }
  save(){
    this.fs.updateObj("users/" + this.user.uid, this.user);
    this.edit = false;
  }



  getPhoto(event) {
    this.editCover = true;
    let uploadedPic = event.target.files[0];
    let pic;
    let reader = new FileReader;
      reader.onloadend =  () => {
        pic = reader.result;

        this.user.cover = pic;
    }
    reader.readAsDataURL(uploadedPic)
      
  }
  getProfilePhoto(event) {
    this.editPhoto = true;
    let uploadedPic = event.target.files[0];
    let pic;
    let reader = new FileReader;
      reader.onloadend =  () => {
        pic = reader.result;
        this.user.photoURL = pic;
        console.log(this.user.photoURL)
    }
    reader.readAsDataURL(uploadedPic);
  }
  cancelCover(){
      let img = document.getElementById("coverPic");
      img.style.background = this.user.coverPhoto;
      this.editCover = false;
  }
  cancelPhoto(){
    let img = document.getElementById("profilePic");
    img.style.background = this.user.photoURL;
    this.editPhoto = false;
}
saveCover(){
  this.fs.updateObj("users/" + this.user.uid, {
    cover: this.user.cover
  })
  this.editCover = false;
}
savePhoto(){
  this.fs.updateObj("users/" + this.user.uid, {
    photoURL: this.user.photoURL
  })
  this.editPhoto = false;
}

}
