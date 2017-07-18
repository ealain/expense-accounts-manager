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

    private user: User = {_id: null, login: null, pwd: null, admin: null, manager: null};
    private r: boolean = true;

    ngOnInit(): void {
        this.route.params.subscribe(params => this.user._id = params['uid']);
        this.userService.getUser(this.user._id)
        .then(user => this.user = user);
    }
}
