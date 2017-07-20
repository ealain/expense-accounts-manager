import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NoteService } from '../shared/note.service';

import { Note } from '../shared/note';

@Component({
    templateUrl: './user.createNote.component.html'
})
export class UserCreateNoteComponent {
    constructor(
        private noteService: NoteService,
        private router: Router) {}

    private note: Note = {
        _id: null,
        day: null,
        month: null,
        year: null,
        date: null,
        title: '',
        amount: null,
        currency: '',
        comment: '',
        files: [],
    } 

    private files: Array<any> = [];

    onAddFile(filelist): void {
        this.files.push(filelist[filelist.length - 1]);
        this.note.files.push(filelist[filelist.length - 1].name);
    }

    addNote(): void {
        this.noteService.add(this.note)
        .then(response => {
            if(response.success) {
                for(let file of this.files) {
                    this.noteService.attach(file, response.noteid);
                }
                this.router.navigate(['user']);
            }
        });
    }
}
