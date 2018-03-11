import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ApiHttpProvider } from '../../providers/api-http.provider';


import { cities } from '../../models/cities';

// TODO: FAZER VERIFICAÇÃO DO
// LOCATION DO BROWSER E CASO SEJA DIFERENTE
// DA QUE ESTA NO LOCALSTORAGE FAZER UM NOVO REQUEST PRO GOOGLE PRA SABER ONDE ELE ESTÁ
// EVITAR GASTAR COTA DE REQUESTS

@Injectable()
export class GeoLocationService {
  private _location: Coordinates;

  items = cities;

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
          const city = data.results[0].address_components[0].long_name;
          const state = data.results[0].address_components[2].short_name;
          observer.next(`${city} - ${state}`);
          observer.complete();
        });
      });
    }
  }

  changeLocation(term: any) {
    if (term.length < 2) {
        return [];
    }
    const result = [];
    this.items.estados.forEach(estado => {
        estado.cidades.forEach(cidade => {
            if (cidade.indexOf(term) !== -1) {
                result.push(`${cidade} - ${estado.sigla}`);
            }
        });
    });
    console.log(result);
    return result;
  }
}
