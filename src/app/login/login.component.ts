import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { LoginService } from './login.service';

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
        private loginService: LoginService,
        private router: Router) {}

    wrongpwd: boolean = false;

    login(user: User): void {
        this.loginService.login(user)
        .then(response => {
            if(response.success) {
                if(response.admin) {console.log('Is admin !')}
                else if(response.manager) {console.log('Is manager.')}
                else {this.router.navigate(['user']);}
            }
            else {this.wrongpwd = true;}
        });
    };
}
