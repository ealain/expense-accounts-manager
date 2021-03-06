import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user';

@Component({
    templateUrl: './admin.editUser.component.html'
})
export class AdminEditUserComponent implements OnInit {
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router) {}

    user: User = {_id: null, login: null, pwd: null, admin: null, manager: null};
    r: boolean = true;
    selection: Array<boolean> = [];
    userlist: Array<User> = [];
    users: Array<User> = [];
    unknown_error: boolean = false;
    two_privileges: boolean = false;

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.user._id = params['uid'];
            this.userService.getUser(this.user._id).then(user => {
                this.user = user;
                if(this.user.manager) {
                    this.userService.getUsers(this.user._id).then(userlist => {
                        this.userlist = userlist;
                        this.userService.getUsers().then(users => {
                            for(let i = 0; i<users.length; i++)
                                if(!(users[i].admin||users[i].manager))
                                    this.users.push(users[i]);
                            for(let i = 0; i < this.users.length; i++)
                                this.selection.push(userlist.includes(this.users[i]._id));
                        });
                    });
                }
            });
        });
    }

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
        this.userService.removeUserList(this.user._id)
        .then(response1 => {
            if(this.user.manager) {
                let selected: Array<string> = [];
                for(let i = 0; i < this.selection.length; i++)
                    if(this.selection[i])
                        selected.push(this.users[i]._id);
                this.userService.addUserList(this.user._id, selected);
            }
            this.userService.addUser(this.user)
                .then(response2 => {
                    if(response1.success && response2.success) {
                        this.router.navigate(['admin']);
                    }
                    else if(response2.same_login) {
                        this.two_privileges = false;
                        this.unknown_error = false;
                    }
                    else if(response2.two_privileges) {
                        this.two_privileges = true;
                        this.unknown_error = false;
                    }
                    else {
                        this.two_privileges = false;
                        this.unknown_error = true;
                    }
                });
        });
    }

    del(): void {
        this.userService.removeUserList(this.user._id)
        .then(response1 => {
            this.userService.delUser(this.user)
                .then(response2 => {
                    if(response1.success && response2.success) {
                        this.router.navigate(['admin']);
                    }
                });
        });
    }
}
