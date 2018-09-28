import { FirestoreService } from './../firestore/firestore.service';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';

declare var google;
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private ls: Storage,
    private fs: FirestoreService,
    private geolocation: Geolocation
  ) { }
  mapCenter;
  map;
  async getAddress(position) {
    return new Promise(async (resolve) => {
      let geocoder = new google.maps.Geocoder;
      let latlng = { lat: position.latitude, lng: position.longitude};
      // let latlng = {lat: 41.2406, lng: -96.0169}
      geocoder.geocode({ 'location': latlng },  async (results, status) => {
        if (status === 'OK') {
          let splitAddress = results[0].formatted_address.split(",");
          let addressComponent = results[0].address_components;
          var address = {
            address: addressComponent[0].long_name + " " + addressComponent[1].long_name + "," + splitAddress[1],
            placeid: results[0].place_id,
          }

          await this.getClosePlaces(latlng);
          let place = await this.getPlaceDetails(address);
          return resolve(place)
        } else {
          window.alert('No results found');
        }

      })
    })
  }

  getPlaceDetails(location){
    let mapCenter = new google.maps.LatLng(-33.8617374, 151.2021291);
    let map = new google.maps.Map(document.getElementById('map'), {
      center: this.mapCenter,
      zoom: 15
    });
    
    return new Promise(async (resolve)=>{
      firebase.firestore().collection("places")
      .where("address" , "==", location.address).get().then(async (placeSnap)=>{
        if(placeSnap.empty){
           let place = await this.noPlaceMatch(location.placeid);
           resolve(place)
        } else {
          let places = [];
        placeSnap.forEach((place)=>{
          places.push(place.data())
        })
        resolve(places[0])
        }
        
      })      
    })
  }
getClosePlaces(position){
  return new Promise((resolve)=>{
    let mapCenter = new google.maps.LatLng(-33.8617374,151.2021291);
    let map = new google.maps.Map(document.getElementById('map'), {
      center: this.mapCenter,
      zoom: 15
    });
    let currentLocation = new google.maps.LatLng(position.lat, position.lng);
    let request = {
        location: currentLocation,
        radius: 250,
    }
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status)=>{
      let otherPlaces = [];
      if (status == google.maps.places.PlacesServiceStatus.OK){
        for (var i = 0; i < results.length; i++) {
          var obj = results[i];
          
          let place = { 
            name: obj.name,
            address: obj.vicinity,
            placeid: obj.place_id
          }
            otherPlaces.push(place)
            this.checkPlaceExists(place)
        }
        this.ls.set("otherPlaces", otherPlaces);
      }
      return resolve()
    });
    
  })

}

async checkPlaceExists(place){
 
  let exists = await this.fs.checkExists("places/" + place.palceid);
  if(!exists){
    this.fs.createPlace("/places/" + place.placeid, place);
  }
}

noPlaceMatch(placeid){
  let mapCenter = new google.maps.LatLng(-33.8617374, 151.2021291);
  let map = new google.maps.Map(document.getElementById('map'), {
    center: this.mapCenter,
    zoom: 15
  });
    return new Promise((resolve)=>{
      let service = new google.maps.places.PlacesService(map);
      let request = {
        placeId: placeid,
        fields: ['name', 'formatted_address', 'place_id']
      }
      service.getDetails(request, ((place, status)=>{
        
        let splitAddress = place.formatted_address.split(",");
        var p = {
          name: place.name,
          address: splitAddress[0] + "," + splitAddress[1],
          placeid: place.place_id
        }
        this.fs.createPlace("places/" + placeid, p);
        return resolve(p)
      }))
    })
     
}
}

