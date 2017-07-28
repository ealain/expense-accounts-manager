import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NoteService } from '../../providers/note.service';
import { AuthService } from '../../providers/auth.service';
import { LoginPage } from '../login/login';
import { UserCreateNotePage } from './user.createNote';
import { UserEditNotePage } from './user.editNote';
import { UserViewNotePage } from './user.viewNote';

import { Note } from '../../shared/note';

@Component({
    selector: 'user-dashboard',
    templateUrl: 'user.dashboard.html',
})
export class UserDashboardPage {
    notes: Note[];

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private authService: AuthService,
        private noteService: NoteService) {}

    ionViewDidLoad(): void {
        this.noteService.getMany()
        .then(response => this.notes = response);
    }

    edit(n): void {
        if(n.approved)
        this.navCtrl.push(UserViewNotePage, {nid: n._id});
        else
        this.navCtrl.push(UserEditNotePage, {nid: n._id});
    }

    create(): void {
        this.navCtrl.push(UserCreateNotePage);
    }

    logout(): void {
        this.authService.logout()
        .then(response => {
            if(response.success) {
                this.navCtrl.setRoot(LoginPage);
            }
        });
    }
}
