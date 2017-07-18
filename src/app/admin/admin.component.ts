import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    constructor(
        private router: Router) {}

    home(): void {
        this.router.navigate(['admin']);
    }

    adduser(): void {
        this.router.navigate(['adduser']);
    }
}
