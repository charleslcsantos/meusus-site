import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GeoLocationService } from '../../services/utils/geo-location.service';

@Component({
  selector: '[app-search-input]',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchInputComponent implements OnInit {
  public location = '';
  public searchTerm = '';

  constructor(
    private geoLocationService: GeoLocationService
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
   * search
   */
  public search() {
    if (this.searchTerm) {
      console.log(this.searchTerm);
    }
  }

}
