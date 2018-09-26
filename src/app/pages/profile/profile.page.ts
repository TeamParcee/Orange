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
    let imgCover = document.getElementById("coverPic");
    imgCover.style.background = "url(" + this.user.coverURL + ") no-repeat center";
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
    this.fs.updateUser("users/" + this.user.uid, this.user);
    this.edit = false;
  }

  getCoverPhoto() {
    this.editCover = true;
    let options: CameraOptions = {
      quality: 100,
      targetHeight: 200,
      allowEdit: true,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.coverURL = 'data:image/jpeg;base64,' + imageData;
      let url = "url(" + 'data:image/jpeg;base64,' + imageData + ") no-repeat center";
      let img = document.getElementById("coverPic");
      img.style.background = url;
    })

  }
  getProfilePhoto() {
    this.editPhoto = true;
    let options: CameraOptions = {
      quality: 100,
      targetHeight: 151,
      allowEdit: true,
      targetWidth: 151,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.photoURL = 'data:image/jpeg;base64,' + imageData;
      let url = "url(" + 'data:image/jpeg;base64,' + imageData + ") no-repeat center";
      let img = document.getElementById("profilePic");
      img.style.background = url;
    })

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
  this.user.coverPhoto = this.coverURL;
  this.fs.updateUser("users/" + this.user.uid, {
    coverURL: this.coverURL
  })
  this.editCover = false;
}
savePhoto(){
  this.user.photoURL = this.photoURL;
  this.fs.updateUser("users/" + this.user.uid, {
    photoURL: this.photoURL
  })
  this.editPhoto = false;
}

}
