import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent {
    constructor(
        private authService: AuthService,
        private router: Router) {}

    logout(): void {
        this.authService.logout()
        .then(response => {
            if(response.success) {
                this.router.navigate(['login']);
            }
        });
    }
}
