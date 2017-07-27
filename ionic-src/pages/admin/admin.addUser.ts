import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../providers/user.service';
import { User } from '../../shared/user';
import { AdminDashboardPage } from './admin.dashboard';

@Component({
    templateUrl: 'admin.addUser.html'
})
export class AdminAddUserPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userService: UserService) {}

    user: any = {login: null, password: null, admin: false, manager: false};
    selection: Array<boolean> = [];
    userlist: Array<User> = [];
    users: Array<User> = [];
    unknown_error: boolean = false;
    same_login: boolean = false;
    two_privileges: boolean = false;

    onChangeManager(): void {
        if(!this.user.manager) {
            this.userService.getUsers(this.user._id).then(userlist => {
                this.userlist = userlist;
                this.userService.getUsers().then(users => {
                    for(let i = 0; i<users.length; i++)
                        if(!(users[i].admin||users[i].manager) && users[i]._id!=this.user._id)
                            this.users.push(users[i]);
                    for(let i = 0; i < this.users.length; i++)
                        this.selection.push(userlist.includes(this.users[i]._id));
                });
            });
        }
        else {
            this.users = [];
            this.selection = [];
        }
    }

    send(): void {
        this.userService.addUser(this.user)
        .then(response => {
            if(response.success) {
                if(this.user.manager) {
                    let selected: Array<string> = [];
                    for(let i = 0; i < this.selection.length; i++)
                        if(this.selection[i])
                            selected.push(this.users[i]._id);
                    this.userService.addUserList(response.uid, selected)
                }
                this.navCtrl.push(AdminDashboardPage);
            }
            else if(response.same_login) {
                this.two_privileges = false;
                this.same_login = true;
                this.unknown_error = false;
            }
            else if(response.two_privileges) {
                this.two_privileges = true;
                this.same_login = false;
                this.unknown_error = false;
            }
            else {
                this.two_privileges = false;
                this.same_login = false;
                this.unknown_error = true;
            }
        });
    }
}
