import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Note } from '../../shared/note';
import { NoteService } from '../../providers/note.service';
import { ManagerDashboardPage } from './manager.dashboard';
import { ManagerNotesPage } from './manager.notes';


@Component({
    templateUrl: './manager.note.details.html'
})
export class ManagerNoteDetailsPage implements OnInit {
    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        private noteService: NoteService) {}

    note: any;
    private nid: string;

    view(nid: string): void {
        this.navCtrl.push(ManagerNotesPage, {nid: nid});
    }

    approve(): void {
        this.noteService.approve(this.navParams.get('nid'))
        .then(() => this.navCtrl.push(ManagerDashboardPage));
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
