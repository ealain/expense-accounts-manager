import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../shared/user';

@Injectable()
export class UserService {
    private url = 'http://localhost:8080/api/users';

    constructor(private http: Http) {}

    getUsers(uid?: string): Promise<any> {
        if(uid) {
            return this.http.get(this.url, {params: {uid: uid}, withCredentials: true})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);}
        else {
            return this.http.get(this.url, {withCredentials: true})
                .toPromise()
                .then(response => response.json())
                .catch(this.handleError);}
    }

    getUser(uid: string): Promise<User> {
        return this.http.get(this.url + '/' + uid, {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getMe(): Promise<User> {
        return this.http.get(this.url + '/me', {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    addUser(u: User): Promise<any> {
        return this.http.post(this.url, u, {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    delUser(u: User): Promise<any> {
        return this.http.delete(this.url + '/' + u._id, {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    addUserList(id: string, l: Array<string>): Promise<any> {
        return this.http.post(this.url + '/lists', {users: l}, {params: {mid: id}, withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    removeUserList(id: string): Promise<any> {
        return this.http.delete(this.url + '/lists', {params: {uid: id}, withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
