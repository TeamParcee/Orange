import { FirestoreService } from './../../services/firestore/firestore.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthService } from '../../services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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
  }

  fbExample;
  instaExample;
  user;
  edit; 
  photoURL;
  coverURL;

  signOut(){
    firebase.auth().signOut().then(()=>{
    })
  }
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
  deleteAccount(){
    this.auth.deleteAccount();
  }
  editPage(){
    this.navCtrl.navigateForward("edit-profile")
  }
  save(){
    this.fs.updateUser("users/" + this.user.uid, this.user);
    this.edit = false;
  }

  getCoverPhoto() {
    let options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      allowEdit: true,
      targetWidth: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{
      let img = document.getElementById("coverPic");
      img.style.backgroundImage = 'data:image/jpeg;base64,' + imageData;
      console.log(img.style.backgroundImage)
    })

  }
}
