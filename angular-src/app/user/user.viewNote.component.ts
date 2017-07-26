import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Note } from '../shared/note';
import { NoteService } from '../shared/note.service';

@Component({
    templateUrl: './user.viewNote.component.html'
})
export class UserViewNoteComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private noteService: NoteService) {}

    note: any;
    private nid: string;

    view(nid: string): void {
        this.router.navigate(['manager/notes', nid]);
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.noteService.getOne(params.get('nid')))
                .subscribe((note: Note) => this.note = note);
    }
}
