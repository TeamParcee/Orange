import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-img-viewer',
  templateUrl: './img-viewer.page.html',
  styleUrls: ['./img-viewer.page.scss'],
})
export class ImgViewerPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private ls: Storage,
  ) { }

  img;
  async ngOnInit() {
    this.img = await this.ls.get('img');
  }
  async close(){
    this.modalCtrl.dismiss();
    this.ls.remove('img');
  }
}
