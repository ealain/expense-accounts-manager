import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../user';

@Injectable()
export class LoginService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private loginUrl = 'http://localhost:8080/login';

    constructor(private http: Http) {}

    login(user): Promise<any> {
        return this.http.post(this.loginUrl, JSON.stringify({login: user.login, password: user.password}), {headers: this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
