import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocationService } from '../../../services/utils/geo-location.service';

@Component({
  selector: 'app-modal-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalLocationComponent implements OnInit {
  location;
  availableCities;

  constructor(
    private geoLocationService: GeoLocationService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }

  public changeLocation = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        if (term.length === 0) {
          return this.availableCities;
        }
        if (term.length < 2) {
          return [];
        }
        this.availableCities = [];
        this.geoLocationService.items.estados.forEach(estado => {
          estado.cidades.map(
            (cidade) => {
              if (new RegExp(term, 'gi').test(cidade)) {
                this.availableCities.push({
                  'cidade': cidade,
                  'estado': estado.nome,
                  'sigla' : estado.sigla
                });
              }
          }
          );
        });
        return this.availableCities.splice(0, 5);
      })
    );
  }

  public formatLocationResult = (result) => `${result.cidade} - ${result.sigla}`;

  setLocation(selectedLocation?) {
    if (selectedLocation) {
      this.location = `${selectedLocation.cidade} - ${selectedLocation.sigla}`;
      this.activeModal.close(this.location);
    }
  }

}
