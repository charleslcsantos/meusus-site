import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GeoLocationService } from '../../services/utils/geo-location.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLocationComponent } from '../modals/location/location.component';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectLocationComponent implements OnInit {
  public location = 'Todo Brasil';

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

  openModalLocation() {
    const modalRef = this.modalService
                         .open(ModalLocationComponent, {windowClass: ' modal_location'})
                         .result.then( res => this.location = res );
  }
}
