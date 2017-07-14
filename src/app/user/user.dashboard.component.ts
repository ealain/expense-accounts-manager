import { Component, OnInit } from '@angular/core';

import { NoteService } from '../shared/note.service';

import { Note } from '../shared/note';

@Component({
    selector: 'user-dashboard',
    templateUrl: 'user.dashboard.component.html',
})
export class UserDashboardComponent implements OnInit {
    private notes: Note[];

    constructor(
        private noteService: NoteService) {}

    getNotes(): void {
        this.noteService.getMany()
        .then(response => this.notes = response);
    }

    ngOnInit(): void {
        this.getNotes();
    }
}
