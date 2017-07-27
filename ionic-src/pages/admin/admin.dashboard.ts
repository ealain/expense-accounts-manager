import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../providers/user.service';
import { User } from '../../shared/user';
import { AdminAddUserPage } from '../admin/admin.addUser';

@Component({
    templateUrl: './admin.dashboard.html'
})
export class AdminDashboardPage implements OnInit {
    constructor(
        public navCtrl: NavController,
        private userService: UserService) {}

    users: User[];

    ngOnInit(): void {
        this.userService.getUsers().then(users => this.users = users);
    }

    edit(uid: string): void {
        this.navCtrl.push(AdminAddUserPage);
    }
}
