import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-inappbrowser',
  templateUrl: './inappbrowser.page.html',
  styleUrls: ['./inappbrowser.page.scss'],
})
export class InappbrowserPage implements OnInit {

  url;
  constructor(
    private sanitize: DomSanitizer,
    private ls: Storage,
  ) { }

  async ngOnInit() {
    this.url = await this.ls.get('url');
  }
  photoURL() {
    return this.sanitize.bypassSecurityTrustResourceUrl(this.url + "&output=embed");
  }
}
