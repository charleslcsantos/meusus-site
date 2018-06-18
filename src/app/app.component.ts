import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocationService } from './services/utils/geo-location.service';
import { SeoService } from './services/seo/seo.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private geoLocationService: GeoLocationService,
    private seoService: SeoService
  ) {
    this.seoService.setDefaultSeo();
  }

  ngOnInit() { }
}
