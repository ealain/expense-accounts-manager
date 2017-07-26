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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let url: string = state.url;
        let privilege: string = route.url[0].path;
        return this.checkLogin(url, privilege);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate(route, state);
    }

    checkLogin(url: string, privilege: string): Promise<boolean> {
        this.authService.redirectUrl = url;
        return this.authService.authenticate()
            .then(response => {
                if(privilege==='admin'&&this.authService.isLoggedInAdmin)
                { return true; }
                if(privilege==='manager'&&this.authService.isLoggedInManager)
                { return true; }
                if(privilege==='user'&&this.authService.isLoggedInUser)
                { return true; }
                this.router.navigate(['/login']);
                return false;
            });
    }
}
