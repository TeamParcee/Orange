import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  uid;
  user;

  constructor(
    private fs: FirestoreService,
    private route: ActivatedRoute,
  ) {
    
   }

  async ngOnInit() {
    this.uid = await this.route.snapshot.paramMap.get('id');
    this.user = await this.fs.getUser(this.uid);
    let imgCover = document.getElementById("coverPic");
    imgCover.style.background = "url(" + this.user.coverURL + ") no-repeat center";
    let imgProfile = document.getElementById("profilePic");
    imgProfile.style.background = "url(" + this.user.photoURL + ") no-repeat center";
  }

}
