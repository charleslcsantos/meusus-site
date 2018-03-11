import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams, Headers, Response } from '@angular/http/';

@Injectable()
export class SearchService {

    url = 'https://en.wikipedia.org/w/api.php';

    constructor(
    ) { }

    search(term: any) {
        if (term.length < 2) {
            return [];
        }
    }
}
