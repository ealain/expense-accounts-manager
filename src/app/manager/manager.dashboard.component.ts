import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';
import { NoteService } from '../shared/note.service';
import { User } from '../shared/user';
import { Note } from '../shared/note';

@Component({
    templateUrl: './manager.dashboard.component.html'
})
export class ManagerDashboardComponent implements OnInit {
    private users: User[] = [];
    private notes: { [uid: string]: Note } = {};

    constructor(
        private userService: UserService,
        private noteService: NoteService,
        private router: Router) {}

    view(nid: string): void {
        this.router.navigate(['manager/notes', nid]);
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
