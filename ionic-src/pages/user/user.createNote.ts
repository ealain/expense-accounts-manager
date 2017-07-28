import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NoteService } from '../../providers/note.service';

import { Note } from '../../shared/note';
import { UserDashboardPage } from './user.dashboard';

@Component({
    templateUrl: './user.createNote.html'
})
export class UserCreateNotePage {
    constructor(
        private noteService: NoteService,
        private navCtrl: NavController) {}

    note: Note = {_id: null, date: null, title: '', amount: null, currency: '', comment: '', approved: false, files: []}

    currencies: Array<string> = ['EUR (€)', 'USD ($)', 'GBP (£)', 'CNY (¥)', 'JPY (¥)', 'CHF (SFr.)'];

    files: Array<any> = [];

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
                this.navCtrl.push(UserDashboardPage);
            }
        });
    }
}
