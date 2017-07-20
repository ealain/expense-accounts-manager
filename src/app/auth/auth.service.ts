import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../user';

@Injectable()
export class AuthService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private loginUrl = 'http://localhost:8080/api/login';
    private logoutUrl = 'http://localhost:8080/api/logout';
    private signupUrl = 'http://localhost:8080/api/signup';

    constructor(private http: Http) {}

    login(user: User): Promise<any> {
        return this.http.post(this.loginUrl, JSON.stringify({login: user.login, password: user.password}), {headers: this.headers})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    logout(): Promise<any> {
        return this.http.get(this.logoutUrl)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    signup(user: User): Promise<any> {
        return this.http.post(this.signupUrl, user)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
