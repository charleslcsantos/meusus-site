import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions, ConnectionBackend} from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchInputComponent } from './shared/search-input/search-input.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { StorageService } from './services/storage.service';
import { GeoLocationService } from './services/utils/geo-location.service';
import { ApiHttpProvider, httpFactory } from './providers/api-http.provider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchInputComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
      { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
    ]),
    HttpModule,
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
    GeoLocationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
