import { Injectable } from '@angular/core';
import {
    Http, XHRBackend,
    Response, Headers, Request,
    RequestOptions, RequestOptionsArgs,
    ConnectionBackend
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';

import { StorageService } from './../services/storage.service';

@Injectable()
export class ApiHttpProvider extends Http {

    private isSecure: boolean = false;
    private baseURL: string = environment.baseURL;
    private token: string;

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private storage: StorageService
    ) {
        super(backend, defaultOptions)
    }

    secure(isSecure: boolean = true): ApiHttpProvider {
        this.isSecure = isSecure;
        return this;
    }

    makeurl(endpoint: any) {
        let protocolPattern = /(http(s?))\:\/\//gi;

        if (protocolPattern.test(endpoint))
            return endpoint;

        return `${this.baseURL}${endpoint}`;
    }

    doRequest(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (typeof url === 'string') {
            url = this.makeurl(url);
        } else {
            url.url = this.makeurl(url.url);
        }

        if (this.isSecure) {
            if (typeof url === 'string') {
                if (!options) {
                    options = { headers: new Headers() };
                }
                options.headers.set('Authorization', `bearer ${this.token}`);
            } else {
                url.headers.set('Authorization', `bearer ${this.token}`);
            }
        }
        return super.request(url, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        this.token = null;

        if (this.isSecure && !this.token) {
            this.token = this.storage.retrieve('token');
            return this.doRequest(url, options);
        }

        return this.doRequest(url, options);
    }
}

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, storageService: StorageService) {
    return new ApiHttpProvider(xhrBackend, requestOptions, storageService);
}