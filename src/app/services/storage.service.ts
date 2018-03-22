import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    store(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    retrieve(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    has(key: string): boolean {
        return Boolean(this.retrieve(key));
    }

    clear(key?: string): void {
        if (key) {
            localStorage.removeItem(key);
        } else {
            localStorage.clear();
        }
    }
}
