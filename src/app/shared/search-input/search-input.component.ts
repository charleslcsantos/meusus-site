import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GeoLocationService } from '../../services/utils/geo-location.service';
import { SearchService } from '../../services/search/search.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-search-input]',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchInputComponent implements OnInit {
  public location = 'Todo Brasil';
  public searchTerm = '';
  public showRequiredField = false;
  public availableCities = [];

  constructor(
    private geoLocationService: GeoLocationService,
    private searchService: SearchService,
    private route: Router
  ) { }

  ngOnInit() {
    this.geoLocationService.getBrowserLocation().subscribe((location) => {
      this.geoLocationService.location = location;
      this.geoLocationService.getLocationByLatLng(location.latitude, location.longitude).subscribe((res) => {
        this.location = res;
      });
    });
  }

  /**
   * changeLocation
   * Função para alterar a localização da consulta.
   */
  public changeLocation() {
    if (this.location) {
      this.availableCities = this.geoLocationService.changeLocation(this.location);
    }
  }

  /**
   * search
   */
  public search() {
    console.log(this.searchTerm.length);
    if (this.searchTerm.length > 0) {
      this.showRequiredField = false;
      this.route.navigate([`/${this.searchTerm}`]);
    } else {
      this.showRequiredField = true;
    }
  }

}
