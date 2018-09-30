import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SavedCheckdnsPage } from './saved-checkdns.page';

const routes: Routes = [
  {
    path: '',
    component: SavedCheckdnsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SavedCheckdnsPage]
})
export class SavedCheckdnsPageModule {}
