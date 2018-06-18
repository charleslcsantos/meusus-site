import { Component, OnInit } from '@angular/core';
import { GeoLocationService } from '../../services/utils/geo-location.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLocationComponent } from '../modals/location/location.component';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss'],
})
export class SelectLocationComponent implements OnInit {
  public location = 'Todo Brasil';
  public availableCities = [];

  constructor(
    private geoLocationService: GeoLocationService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.geoLocationService.getBrowserLocation().subscribe((location) => {
      this.geoLocationService.location = location;
      this.geoLocationService.getLocationByLatLng(location.latitude, location.longitude).subscribe((res) => {
        this.location = res;
      });
    });
  }

  changeLocation() {
    if (this.location) {
      this.availableCities = this.geoLocationService.changeLocation(this.location);
    }
  }

  openModalLocation() {
    const modalRef = this.modalService.open(ModalLocationComponent);
  }
}
