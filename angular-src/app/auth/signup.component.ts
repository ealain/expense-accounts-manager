import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent {
    user: any = {
        login: '',
        password: ''
    };
    same_login: boolean = false;
    unknown_error: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router) {}

    login(): void {
        this.router.navigate(['login']);
    }

    signup(user: any): void {
        this.authService.signup(user)
        .then(response => {
            if(response.success) {
                this.router.navigate(['login']);
            }
            else if(response.same_login) {
                this.same_login = true;
                this.unknown_error = false;
            }
            else {
                this.same_login = false;
                this.unknown_error = true;
            }
        });
    }
}
