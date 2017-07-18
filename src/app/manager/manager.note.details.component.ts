import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Note } from '../shared/note';
import { NoteService } from '../shared/note.service';

@Component({
    templateUrl: './manager.note.details.component.html'
})
export class ManagerNoteDetailsComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private noteService: NoteService) {}

    private note: Note;
    private nid: string;

    view(nid: string): void {
        this.router.navigate(['manager/notes', nid]);
    }

    approve(): void {
        this.route.params.subscribe(params => this.noteService.approve(params['nid']).then(() => this.router.navigate(['manager'])));
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.noteService.getOne(params.get('nid')))
                .subscribe((note: Note) => this.note = note);
    }
}
