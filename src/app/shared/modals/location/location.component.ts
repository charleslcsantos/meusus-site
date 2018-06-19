import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocationService } from '../../../services/utils/geo-location.service';

@Component({
  selector: 'app-modal-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class ModalLocationComponent implements OnInit {
  public location;
  public availableCities;

  constructor(
    private geoLocationService: GeoLocationService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }

  public changeLocation = (text$: Observable<string>) => {
    return text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map((term) => {
      if (term.length === 0) {
        return this.availableCities;
      }
      if (term.length < 2) {
        return [];
      }
      this.availableCities = this.geoLocationService.items;
      return this.availableCities.filter(
        (v) => new RegExp(term, 'gi')
        .test(v.nome_fantasia)
      ).splice(0, 10);
    });
  }

  public formatCampusResult = (result) => result.nome_fantasia;

  setLocation(selectedLocation) {
    if (selectedLocation) {
      this.location = selectedLocation;
      this.activeModal.close(this.location);
    }
  }

}
