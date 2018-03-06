import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[app-search-input]',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchInputComponent implements OnInit {
  public searchTerm = '';

  constructor() { }

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
