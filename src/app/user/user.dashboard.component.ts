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

    backgnd: Array<string> = [];

    constructor(
        private router: Router,
        private noteService: NoteService) {}

    ngOnInit(): void {
        this.noteService.getMany()
        .then(response => this.notes = response)
        .then(() => {
            for(let n of this.notes) {
                if(n.approved)
                    this.backgnd.push('#dff0d8');
                else
                    this.backgnd.push('');
            }
        });
    }

    menter(i: number): void {
        this.backgnd[i] = '';
    }

    mleave(i: number): void {
        if(this.notes[i].approved) {
            this.backgnd[i] = '#dff0d8';
        }
    }

    edit(n): void {
        if(n.approved)
        this.router.navigate(['user/view/' + n._id]);
        else
        this.router.navigate(['user/edit/' + n._id]);
    }
}
