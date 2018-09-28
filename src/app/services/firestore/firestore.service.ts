import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  getUser(uid) {
    return new Promise((resolve) => {
      firebase.firestore().doc("users/" + uid).get().then((user) => {
        return resolve(user.data())
      })
    })
  }
getNewId(col){
  return new Promise((resolve)=>{
    let id = firebase.firestore().collection(col).doc().id;
    return resolve(id)
  })
}
  getCurrentUser() {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          firebase.firestore().doc("users/" + user.uid).get().then((u) => {
            return resolve(u.data())
          })
        }
      })
    })
  }
  sendMessage(message, placeid) {
    firebase.firestore().collection("places/" + placeid + "/feed/").add(message)
      .then((result) => {
        result.update({
          mid: result.id
        })
      })
  }

  async checkExists(doc) {
    let obj = await firebase.firestore().doc(doc).get();
    return obj.exists;
  }

  createPlace(doc, place) {
    return new Promise((resolve, reject) => {
      firebase.firestore().doc(doc).set(place).then(() => {
        return resolve()
      }).catch((error) => {
        return reject(error.message)
      })
    })
  }
  getPlace(doc) {
    return new Promise((resolve, reject) => {
      firebase.firestore().doc(doc).get().then((result) => {
        return resolve(result.data());
      })
        .catch((error) => {
          return reject(error.message)
        })
    })
  }
  checkUserIn(doc, uid) {
    firebase.firestore().doc(doc).set({ uid: uid })
  }
  checkUserOut(doc, uid) {
    firebase.firestore().doc(doc).delete()
  }

  deleteAnonymousUser(uid) {
    let dbRef = "/users/delete/" + uid;
    firebase.database().ref(dbRef).set({ online: "yes" });
    firebase.database().ref(dbRef)
      .onDisconnect().remove();
  }

  // removes the checkdn after the user leaves the app;
  removeOnLogOff(uid, placeid) {
    let dbRef = "/users/" + placeid + "/" + uid;
    firebase.database().ref(dbRef).set({ online: "yes" });
    firebase.database().ref(dbRef)
      .onDisconnect().remove();
  }
  deleteCurrentUser(uid){
    firebase.firestore().doc("/users/" + uid).delete();
  }

  updateUser(doc, obj){
    firebase.firestore().doc(doc).update(obj)
  }
}
