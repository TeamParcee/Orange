import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  uid;
  user;

  constructor(
    private iab: InAppBrowser,
    private ls: Storage,
    private navCtrl: NavController,
    private fs: FirestoreService,
    private route: ActivatedRoute,
  ) {
    
   }

  async ngOnInit() {
    this.uid = await this.route.snapshot.paramMap.get('id');
    this.user = await this.fs.getUser(this.uid);
  }

  showPage(url){
    this.iab.create(url, "_self").show();
  }
}
