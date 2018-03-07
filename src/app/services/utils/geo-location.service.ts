import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ApiHttpProvider } from '../../providers/api-http.provider';

// TODO: FAZER VERIFICAÇÃO DO
// LOCATION DO BROWSER E CASO SEJA DIFERENTE
// DA QUE ESTA NO LOCALSTORAGE FAZER UM NOVO REQUEST PRO GOOGLE PRA SABER ONDE ELE ESTÁ
// EVITAR GASTAR COTA DE REQUESTS

@Injectable()
export class GeoLocationService {
  private _location: Coordinates;

  get location() {
    return this._location;
  }

  set location(value: any) {
    this._location = value;
  }

  constructor(
    public apiHttpProvider: ApiHttpProvider,
  ) {
  }

  getBrowserLocation(): Observable<Coordinates> {
    return Observable.create((observer) => {
      if (navigator && 'geolocation' in navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          observer.next(position.coords);
          observer.complete();
        });
      }
    });
  }

  getLocationByLatLng(lat: number, lng: number) {
    if (lat && lng) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}
                   &language=pt-BR&result_type=locality&key=AIzaSyDOA1-uKTGyCCgzH5EKzkeR3HWLEiozqgw`;
      return Observable.create((observer) => {
        return this.apiHttpProvider.get(url).map((response) => response.json()).subscribe(data => {
          observer.next(data.results[0].address_components[0].long_name);
          observer.complete();
        });
      });
    }
  }
}
