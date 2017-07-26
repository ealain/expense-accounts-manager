import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';
import { User } from '../../shared/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    user: User = {_id: null, login: '', pwd: '', manager: null, admin: null};
    wrongpwd: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public authService: AuthService) {
    }

    login(user: any): void {
        this.authService.login(user)
        .then(response => {
            if(response.success) {
                if(response.admin) {console.log('admin');}
                else if(response.manager) {console.log('manager');}
                else {console.log('user');}
            }
            else {this.wrongpwd = true;}
        });
    };
}
