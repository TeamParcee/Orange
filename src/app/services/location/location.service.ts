import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private geolocation: Geolocation
  ) { 
    
  }


  async getAddress(position) {
    return new Promise(async (resolve) => {
      let geocoder = new google.maps.Geocoder;
      let latlng = { lat: position.latitude, lng: position.longitude};
      geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === 'OK') {
          var address = {
            address: results[0].formatted_address,
            placeid: results[0].place_id
          }
          return resolve(address)
        } else {
          window.alert('No results found');
        }

      })
    })
  }

  getPlaceDetails(placeid){
    return new Promise((resolve)=>{
      let mapCenter = new google.maps.LatLng(-33.8617374,151.2021291);
      let map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 15
      });
      let service = new google.maps.places.PlacesService(map);
      let request = {
        placeId: placeid,
        fields: ['name', 'formatted_address', 'place_id']
      }
      return service.getDetails(request, ((place, status)=>{
        return resolve(place);
      }))
    })
  }

}
