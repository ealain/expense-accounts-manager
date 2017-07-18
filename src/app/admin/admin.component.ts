import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    constructor(
        private authService: AuthService,
        private router: Router) {}

    home(): void {
        this.router.navigate(['admin']);
    }

    adduser(): void {
        this.router.navigate(['adduser']);
    }

    logout(): void {
        this.authService.logout()
        .then(response => {
            if(response.success) {
                this.router.navigate(['login']);
            }
        });
    }
}
