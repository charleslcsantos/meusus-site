import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  public searchTerm = '';
  public showRequiredField = false;

  constructor(
    private searchService: SearchService,
    private route: Router
  ) { }

  ngOnInit() { }

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
