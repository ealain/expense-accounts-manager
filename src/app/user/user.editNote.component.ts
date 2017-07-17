import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Note } from '../shared/note';
import { NoteService } from '../shared/note.service';

@Component({
    templateUrl: './user.editNote.component.html'
})
export class UserEditNoteComponent {
    constructor(
        private noteService: NoteService,
        private route: ActivatedRoute,
        private router: Router) {}

    private note: Note = {
        day: null,
        month: null,
        year: null,
        date: null,
        title: '',
        amount: null,
        currency: '',
        comment: '',
        files: [],    
    };

    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.noteService.getOne(params.get('nid')))
                .subscribe((note: Note) => this.note = note);
    }
}
