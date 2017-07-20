import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user';

@Component({
    templateUrl: './admin.dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
    constructor(
        private userService: UserService,
        private router: Router) {}

    users: User[];

    ngOnInit(): void {
        this.userService.getUsers().then(users => this.users = users);
    }

    edit(uid: string): void {
        this.router.navigate(['admin/user', uid]);
    }
}
