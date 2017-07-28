import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../providers/user.service';
import { AuthService } from '../../providers/auth.service';
import { User } from '../../shared/user';
import { LoginPage } from '../login/login';
import { AdminAddUserPage } from './admin.addUser';
import { AdminEditUserPage } from './admin.editUser';

@Component({
    templateUrl: './admin.dashboard.html'
})
export class AdminDashboardPage implements OnInit {
    constructor(
        private navCtrl: NavController,
        private authService: AuthService,
        private userService: UserService) {}

    users: User[];

    ngOnInit(): void {
        this.userService.getUsers().then(users => this.users = users);
    }

    edit(uid: string): void {
        this.navCtrl.push(AdminEditUserPage, {uid: uid});
    }

    addUser(): void {
        this.navCtrl.push(AdminAddUserPage);
    }

    logout(): void {
        this.authService.logout()
        .then(response => {
            if(response.success) {
                this.navCtrl.setRoot(LoginPage);
            }
        });
    }
}
