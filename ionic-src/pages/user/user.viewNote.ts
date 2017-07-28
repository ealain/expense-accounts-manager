import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { Note } from '../../shared/note';
import { NoteService } from '../../providers/note.service';
import { UserDashboardPage } from './user.dashboard';

@Component({
    templateUrl: './user.viewNote.html'
})
export class UserViewNotePage implements OnInit {
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private noteService: NoteService) {}

    note: any;
    private nid: string;

    view(nid: string): void {
        this.navCtrl.push(UserDashboardPage);
    }

    ngOnInit() {
        this.noteService.getOne(this.navParams.get('nid'))
            .then((note) => {
                this.note = note;
                let d = new Date(this.note.date);
                this.note.day = d.getDate() - 1;
                this.note.month = d.getMonth() + 1;
                this.note.year = d.getFullYear();
            });
    }
}
