import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../providers/user.service';
import { NoteService } from '../../providers/note.service';
import { User } from '../../shared/user';
import { Note } from '../../shared/note';

@Component({
    templateUrl: './manager.notes.html'
})
export class ManagerNotesPage implements OnInit {
    users: User[] = [];
    notes: { [uid: string]: Note } = {};

    constructor(
        private navCtrl: NavController,
        private userService: UserService,
        private noteService: NoteService) {}

    view(nid: string): void {
        this.navCtrl.push(ManagerNotesPage, {nid: nid});
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
}
