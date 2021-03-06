import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user';

@Component({
    templateUrl: './admin.addUser.component.html'
})
export class AdminAddUserComponent {
    constructor(
        private userService: UserService,
        private router: Router) {}

    user: any = {login: null, password: null, admin: false, manager: false};
    selection: Array<boolean> = [];
    userlist: Array<User> = [];
    users: Array<User> = [];
    unknown_error: boolean = false;
    same_login: boolean = false;
    two_privileges: boolean = false;

    onChangeManager(): void {
        if(!this.user.manager) {
            this.userService.getUsers().then(users => {
                for(let i = 0; i<users.length; i++) {
                    this.selection.push(false);
                    if(!(users[i].admin||users[i].manager) && users[i]._id!=this.user._id)
                        this.users.push(users[i]);
                }
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
                this.router.navigate(['admin']);
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
