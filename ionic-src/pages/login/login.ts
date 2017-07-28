import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth.service';
import { User } from '../../shared/user';
import { AdminDashboardPage } from '../admin/admin.dashboard';
import { ManagerDashboardPage } from '../manager/manager.dashboard';
import { UserDashboardPage } from '../user/user.dashboard';

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
        public localStorage: Storage,
        public authService: AuthService) {
    }

    login(user: any): void {
        this.authService.login(user)
        .then(response => {
            if(response.success) {
                this.localStorage.set('access_token', response.access_token);
                if(response.admin) {this.navCtrl.setRoot(AdminDashboardPage);}
                else if(response.manager) {this.navCtrl.setRoot(ManagerDashboardPage);}
                else {this.navCtrl.setRoot(UserDashboardPage);}
            }
            else {this.wrongpwd = true;}
        });
    };
}
