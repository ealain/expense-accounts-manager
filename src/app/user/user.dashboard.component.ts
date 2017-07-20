import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NoteService } from '../shared/note.service';

import { Note } from '../shared/note';

@Component({
    selector: 'user-dashboard',
    templateUrl: 'user.dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
    notes: Note[];

    constructor(
        private router: Router,
        private noteService: NoteService) {}

    getNotes(): void {
        this.noteService.getMany()
        .then(response => this.notes = response);
    }

    ngOnInit(): void {
        this.getNotes();
    }

    edit(nid): void {
        this.router.navigate(['user/edit/' + nid]);
    }
}
