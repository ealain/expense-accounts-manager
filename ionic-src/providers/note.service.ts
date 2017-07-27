import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Note } from '../shared/note';

@Injectable()
export class NoteService {
    private url = 'http://localhost:8080/api/notes';
    private urlupload = 'http://localhost:8080/api/uploads';

    constructor(
        private http: Http) {}

    private isoStringToDate(d: string): any {
	var b = d.split(/\D/);
	return new Date(d);
    }

    getOne(id: string): Promise<any> {
        return this.http.get(this.url + '/' + id, {withCredentials: true})
        .toPromise()
        .then(response => {
            let n = response.json();
            let d = new Date(n.date);
            n.day = d.getDate() - 1;
            n.month = d.getMonth() + 1;
            n.year = d.getFullYear();
            return n;})
        .catch(this.handleError);
    }

    getMany(): Promise<any> {
        return new Promise((resolve, reject) => {
            let result = [];
            this.http.get(this.url, {withCredentials: true})
                .toPromise()
                .then(response => {
                    for(let n of response.json()) {
                        let d = new Date(n.date);
                        n.day = d.getDate() - 1;
                        n.month = d.getMonth() + 1;
                        n.year = d.getFullYear();
                        result.push(n);
                    }
                })
                .catch(this.handleError);
            resolve(result);
        });
    }

    getManyByUser(uId): Promise<any> {
        return this.http.get(this.url, {params: {uid: uId}, withCredentials: true})
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

    add(note: Note): Promise<any> {
        note.date = new Date(+note.year, +note.month-1, +note.day+1);
        return this.http.post(this.url, note, {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    update(note: Note): Promise<any> {
        note.date = new Date(+note.year, +note.month-1, +note.day+1);
        return this.http.post(this.url + '/' + note._id, note, {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    deleteOne(note: Note): Promise<any> {
        return this.http.delete(this.url + '/' + note._id, {withCredentials: true})
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    attach(file: any, noteId: string): Promise<any> {
        return this.http.post(this.urlupload + '/' + noteId, file, {params: {name: file.name}, withCredentials: true})
        .toPromise()
        .catch(this.handleError);
    }

    detach(filename, noteId: string): Promise<any> {
        return this.http.delete(this.urlupload + '/' + noteId, {params: {name: filename}, withCredentials: true})
        .toPromise()
        .catch(this.handleError);
    }

    approve(nid: string): Promise<any> {
        return this.http.post(this.url + '/approve', {}, {params: {id: nid}, withCredentials: true}).toPromise().catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
