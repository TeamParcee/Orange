import { FirestoreService } from './../../services/firestore/firestore.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

user;
imageFile;
  constructor(
    private fs: FirestoreService
  ) { }

  async ngOnInit() {
    this.user = await this.fs.getCurrentUser();
  }

  save(){
    this.fs.updateUser("users/" + this.user.uid, this.user)
  }

  getPicture(event) {
    let uploadedPic = event.target.files[0];
    let imageFile;
    imageFile = uploadedPic;
    let reader = new FileReader;
    let that = this;
    reader.onloadend =  function () {
      that.user.photoURL =   reader.result; 
    }
    reader.readAsDataURL(uploadedPic)
    this.imageFile = imageFile;
  }
}
