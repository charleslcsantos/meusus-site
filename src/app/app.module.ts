import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, Http, XHRBackend, RequestOptions, ConnectionBackend} from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchTermFormComponent } from './shared/search-term-form/search-term-form.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { StorageService } from './services/storage.service';
import { GeoLocationService } from './services/utils/geo-location.service';
import { ApiHttpProvider, httpFactory } from './providers/api-http.provider';
import { SearchService } from './services/search/search.service';
import { SearchResultComponent } from './pages/search-result/search-result.component';
import { SeoService } from './services/seo/seo.service';
import { TitleService } from './services/seo/title.service';
import { MetabaseService } from './services/seo/metabase.service';
import { AbsoluteUrlService } from './services/utils/absoluteurl.service';
import { SelectLocationComponent } from './shared/select-location/select-location.component';
import { ModalLocationComponent } from './shared/modals/location/location.component';
import { HeaderComponent } from './shared/header/header.component';

const COMPONENTS = [
  AppComponent,
  HomeComponent,
  HeaderComponent,
  SearchTermFormComponent,
  SearchResultComponent,
  SelectLocationComponent,
  ModalLocationComponent,
];

@NgModule({
  declarations: [
    COMPONENTS,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: ':keyword', component: SearchResultComponent, pathMatch: 'full'},
    ]),
    HttpModule,
    NgbModule.forRoot(),
    TransferHttpCacheModule,
    FormsModule
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    {
      provide: ConnectionBackend,
      useClass: XHRBackend
    },
    ApiHttpProvider,
    StorageService,
    SeoService,
    TitleService,
    MetabaseService,
    AbsoluteUrlService,
    GeoLocationService,
    SearchService,
  ],
  entryComponents: [ ModalLocationComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
