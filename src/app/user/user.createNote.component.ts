import { Component } from '@angular/core';

import { NoteService } from '../shared/note.service';

import { Note } from '../shared/note';

@Component({
    templateUrl: './user.createNote.component.html'
})
export class UserCreateNoteComponent {
    constructor(
        private noteService: NoteService) {}

    private note: Note = {
        day: null,
        month: null,
        year: null,
        date: null,
        title: '',
        amount: null,
        currency: '',
        comment: '',
        files: [''],
    } 

    addNote(): void {
        this.noteService.add(this.note);
    }
}
