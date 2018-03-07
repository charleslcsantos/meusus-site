import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocationService } from './services/utils/geo-location.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
  constructor(
    private router: Router,
    private geoLocationService: GeoLocationService,
  ) { }
}
