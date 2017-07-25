import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
    templateUrl: './manager.component.html'
})
export class ManagerComponent {
    constructor(
        private authService: AuthService,
        private router: Router) {}

    logout(): void {
        this.authService.logout()
        .then(response => {
            if(response.success) {
                this.router.navigate(['/']);
            }
        });
    }
}
