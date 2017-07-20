import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

import { User } from '../user';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    user: User = {
        login: '',
        password: '',
        admin: false,
        manager: false
    };

    constructor(
        private authService: AuthService,
        private router: Router) {}

    wrongpwd: boolean = false;

    login(user: any): void {
        this.authService.login(user)
        .then(response => {
            if(response.success) {
                if(response.admin) {this.router.navigate(['admin']);}
                else if(response.manager) {this.router.navigate(['manager']);}
                else {this.router.navigate(['user']);}
            }
            else {this.wrongpwd = true;}
        });
    };

    signup(): void {
        this.router.navigate(['signup']);
    }
}
