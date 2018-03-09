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
  public location = '';
  public searchTerm = '';
  public cidade = '';
  public results = [];

  constructor(
    private geoLocationService: GeoLocationService,
    private searchService: SearchService,
    private route: Router
  ) {
    this.geoLocationService.getBrowserLocation().subscribe((location) => {
      this.geoLocationService.location = location;
      this.geoLocationService.getLocationByLatLng(location.latitude, location.longitude).subscribe((res) => {
        this.location = res;
      });
    });
  }

  ngOnInit() {
  }

  /**
   * changeLocation
   */
  public changeLocation() {
    if (this.cidade) {
      this.results = this.searchService.search(this.cidade);
    }
  }

  /**
   * search
   */
  public search() {
    console.log(this.searchTerm);
    this.route.navigate([`/${this.searchTerm}`]);
  }

}
