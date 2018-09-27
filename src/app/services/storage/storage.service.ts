import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef = firebase.storage().ref();
  constructor() { }


  uploadFeedImage(file, place, id){
    return new Promise((resolve)=>{
      this.storageRef.child('feed/imgs/' + place + "/" + id).put(file).then((snapshot)=>{
        snapshot.ref.getDownloadURL().then((url)=>{
          return resolve(url)
        })
      })
    })
  
  }
}
