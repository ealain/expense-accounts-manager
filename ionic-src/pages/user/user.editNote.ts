import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/switchMap';

import { Note } from '../../shared/note';
import { NoteService } from '../../providers/note.service';

import { UserDashboardPage } from './user.dashboard';

@Component({
    templateUrl: './user.editNote.html'
})
export class UserEditNotePage {
    constructor(
        private noteService: NoteService,
        private navParams: NavParams,
        private navCtrl: NavController) {}

    note: Note = {_id: null, day: null, month: null, year: null, date: null, title: '', amount: null, currency: '', comment: '', approved: false, files: []};

    currencies: Array<string> = ['EUR (€)', 'USD ($)', 'GBP (£)', 'CNY (¥)', 'JPY (¥)', 'CHF (SFr.)'];

    files: Array<any> = [];
    private filesToDelete: Array<any> = [];

    ngOnInit() {
        this.noteService.getOne(this.navParams.get('nid'))
            .then((note) => this.note = note);
    }

    onAddFile(filelist): void {
        this.files.push(filelist[filelist.length - 1]);
        this.note.files.push(filelist[filelist.length - 1].name);
    }

    deleteFile(filename): void {
        this.note.files.splice(this.note.files.indexOf(filename), 1);
        if(this.files.includes(filename)) {
            this.files.splice(this.indexByFilename(filename), 1);
        }
        else {
            this.filesToDelete.push(filename);
        }
    }

    updateNote(): void {
        this.noteService.update(this.note)
        .then(response => {
            if(response.success) {
                for(let file of this.files) {
                    this.noteService.attach(file, response.noteid);
                }
                for(let file of this.filesToDelete) {
                    this.noteService.detach(file, response.noteid);
                }
                this.navCtrl.push(UserDashboardPage);
            }
        });
    }

    deleteNote(): void {
        this.noteService.deleteOne(this.note)
        .then(response => {
            if(response.success) {
                this.navCtrl.push(UserDashboardPage);
            }
        })
    }

    // Tools
    indexByFilename(filename): number {
        for(var i = 0; i < this.files.length; i += 1) {
            if(this.files[i].name === filename) {
                return i;
            }
        }
        return -1;
    }
}
