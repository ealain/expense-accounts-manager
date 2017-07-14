import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class NoteService {
    private url = 'http://localhost:8080/notes';

    constructor(private http: Http) {}

    private isoStringToDate(d: string): any {
	var b = d.split(/\D/);
	return new Date(d);
    }

    getOne(id: string): Promise<any> {
        return this.http.get(this.url + '/' + id, {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getMany(): Promise<any> {
        return this.http.get(this.url, {withCredentials: true})
        .toPromise()
        .then(response => {
            let result = [];
            for(let n of response.json()) {
                let d = new Date(n.date);
                n.day = d.getDate() - 1;
                n.month = d.getMonth() + 1;
                n.year = d.getFullYear();
                result.push(n);
            }
            return result;
        })
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
