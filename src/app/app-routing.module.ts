import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserCreateNoteComponent } from './user/user.createNote.component';
import { UserDashboardComponent } from './user/user.dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent, children: [
        { path: '', component: UserDashboardComponent },
        { path: 'create', component: UserCreateNoteComponent }
    ]},
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
