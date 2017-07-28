import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../providers/user.service';
import { AuthService } from '../../providers/auth.service';
import { NoteService } from '../../providers/note.service';
import { User } from '../../shared/user';
import { Note } from '../../shared/note';
import { LoginPage } from '../login/login';
import { ManagerDashboardPage } from './manager.dashboard';
import { ManagerNoteDetailsPage } from './manager.note.details';

@Component({
    templateUrl: './manager.notes.html'
})
export class ManagerNotesPage implements OnInit {
    users: User[] = [];
    notes: { [uid: string]: Note } = {};

    constructor(
        private navCtrl: NavController,
        private userService: UserService,
        private authService: AuthService,
        private noteService: NoteService) {}

    dash(): void {
        this.navCtrl.setRoot(ManagerDashboardPage);
    }

    view(nid: string): void {
        this.navCtrl.push(ManagerNoteDetailsPage, {nid: nid});
    }

    getUsers(): void {
        this.userService.getUsers()
        .then(response => {
            for(let uid of response) {
                this.userService.getUser(uid)
                    .then(u => this.users.push(u));
                this.noteService.getManyByUser(uid)
                    .then(notes => this.notes[uid] = notes);
            }
        });
    }

    ngOnInit(): void {
        this.getUsers();
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
