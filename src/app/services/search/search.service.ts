import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams, Headers, Response } from '@angular/http/';

import { cities } from '../../models/cities';

@Injectable()
export class SearchService {

    url = 'https://en.wikipedia.org/w/api.php';

    items = cities;

    constructor(
    ) { }

    search(term: any) {
        if (term.length < 2) {
            return [];
        }
        const result = [];
        this.items.estados.forEach(estado => {
            estado.cidades.forEach(cidade => {
                if (cidade.indexOf(term) !== -1) {
                    result.push(`${cidade} - ${estado.sigla}`);
                }
            });
        });
        console.log(result);
        return result;
    }
}
