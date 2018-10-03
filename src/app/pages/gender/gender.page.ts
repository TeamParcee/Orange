import { FirestoreService } from './../../services/firestore/firestore.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
})
export class GenderPage implements OnInit {

  user
  constructor(
    private navCtrl: NavController,
    private fs: FirestoreService,
  ) { }

  async ngOnInit() {
    this.user = await this.fs.getCurrentUser();
  }

  gender;

  save(){
    this.fs.updateObj("users/" + this.user.uid, {
      gender: this.gender
    })
    this.navCtrl.navigateForward("/home");
  }
}
