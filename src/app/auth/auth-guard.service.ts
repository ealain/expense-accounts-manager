import { Injectable } from '@angular/core';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        console.log(route.url[0].path);
        let privilege: string = route.url[0].path;
        return this.checkLogin(url, privilege);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string, privilege: string): boolean {
        console.log('privilege:', privilege);
        if (privilege === 'admin' && this.authService.isLoggedInAdmin) { return true; }
        if (privilege === 'manager' && this.authService.isLoggedInManager) { return true; }
        if (privilege === 'user' && this.authService.isLoggedInUser) { return true; }
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
