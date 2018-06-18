import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocationService } from '../../../services/utils/geo-location.service';

@Component({
  selector: 'app-modal-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class ModalLocationComponent implements OnInit {
  public location;
  public availableCities = [];

  constructor(
    private geoLocationService: GeoLocationService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }

  changeLocation() {
    if (this.location) {
      this.availableCities = this.geoLocationService.changeLocation(this.location);
    }
  }

  setLocation(selectedLocation) {
    if (selectedLocation) {
      this.location = selectedLocation;
      this.activeModal.close(this.location);
    }
  }

}
