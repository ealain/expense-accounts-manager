import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
    private url = 'http://localhost:8080/api/users';

    constructor(private http: Http) {}

    getUsers(): Promise<any> {
        return this.http.get(this.url, {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getUser(uid: string): Promise<User> {
        return this.http.get(this.url + '/' + uid, {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
