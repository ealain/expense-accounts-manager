import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent {
    private user: any = {
        login: '',
        password: ''
    };

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
            else {
            }
        });
    }
}
