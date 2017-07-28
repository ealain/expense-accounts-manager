import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../providers/user.service';
import { NoteService } from '../../providers/note.service';
import { AuthService } from '../../providers/auth.service';
import { User } from '../../shared/user';
import { Note } from '../../shared/note';
import { LoginPage } from '../login/login';
import { ManagerNotesPage } from './manager.notes';
import { ManagerNoteDetailsPage } from './manager.note.details';
import { ManagerChatPage } from './manager.chat';

@Component({
    templateUrl: './manager.dashboard.html'
})
export class ManagerDashboardPage implements OnInit {
    users: User[] = [];
    notes: { [uid: string]: Note } = {};

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private navCtrl: NavController,
        private noteService: NoteService) {}

    view(nid: string): void {
        this.navCtrl.push(ManagerNoteDetailsPage, {nid: nid});
    }

    viewAll(): void {
        this.navCtrl.push(ManagerNotesPage);
    }

    chat(uid: string): void {
        this.navCtrl.push(ManagerChatPage, {uid: uid});
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
