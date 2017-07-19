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

    private user: any = {login: null, password: null, admin: false, manager: false};
    private selection: Array<boolean> = [];
    private userlist: Array<User> = [];
    private users: Array<User> = [];

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
        if(this.user.manager) {
            let selected: Array<string> = [];
            for(let i = 0; i < this.selection.length; i++)
                if(this.selection[i])
                    selected.push(this.users[i]._id);
            this.userService.addUserList(this.user._id, selected);
        }
        this.userService.updateUser(this.user)
        .then(response => {
            if(response.success) {
                this.router.navigate(['admin']);
            }
        });
    }
}
