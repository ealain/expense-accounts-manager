import { Component } from '@angular/core';

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

    constructor(private loginService: LoginService) {}

    wrongpwd = false;

    login(user: User): void {
        this.loginService.login(user)
        .then(response => {
            if(response.admin) {console.log('Is admin !')}
            else if(user.manager) {console.log('Is manager.')}
            else {console.log('Is user')}
        });
    };
}
