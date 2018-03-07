import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { RequestOptions, URLSearchParams, Headers, Response } from '@angular/http/';

import { ApiHttpProvider } from './../../providers/api-http.provider';

// Service
import { ISearchService } from './search.interface';


const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
    fromObject: {
        action: 'opensearch',
        format: 'json',
        origin: '*'
    }
});



@Injectable()
export class CourseSearchService implements ISearchService {

    url = '';


    items: Array<string> = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
        'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
        'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    constructor(
        public http: ApiHttpProvider,
        private http2: HttpClient
    ) {

    }

    search(term: any, data: any) {
        if (term.length < 2) {
            return [];
        }

        // return this.items.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);

        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const params: URLSearchParams = new URLSearchParams();
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('origin', '*');
        params.set('search', term);

        const requestOptions = new RequestOptions({ headers: headers, params: params });

        return this.http
            .get(WIKI_URL, requestOptions)
            .map(response => response.json()[1].slice(0, 10));
    }

    generateUrl(term: any) {
        return `localidade/salvador/${term.toLowerCase()}`;
    }
}
