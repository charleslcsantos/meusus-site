import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AbsoluteUrlService  {

  private baseURL: string;
  private currentUrl: Observable<string>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private _router: Router,
    private _r1: ActivatedRoute
  ) {

    this.baseURL = environment.baseURL;

    this.currentUrl = Observable.create(observer => {
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          observer.next(event.urlAfterRedirects);
          observer.complete();
        }
      });
    });
  }

  getAbsoluteUrl(path: string): string {

    path = !!path ? path : this.location.path();
    return this.baseURL + path;
  }

  getAbsoluteUrlFromPath(path: string): Observable<string> {

    return Observable.create((observer) => {

      if (!!path === false) {

        this.currentUrl.subscribe((url) => {
          observer.next(this.baseURL + url);
          observer.complete();
        });

      } else {
        observer.next(this.baseURL + path);
        observer.complete();
      }


    });
  }

}
