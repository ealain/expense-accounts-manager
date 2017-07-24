import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { SignupComponent } from './auth/signup.component';
import { UserComponent } from './user/user.component';
import { UserCreateNoteComponent } from './user/user.createNote.component';
import { UserEditNoteComponent } from './user/user.editNote.component';
import { UserViewNoteComponent } from './user/user.viewNote.component';
import { UserDashboardComponent } from './user/user.dashboard.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerDashboardComponent } from './manager/manager.dashboard.component';
import { ManagerNotesComponent } from './manager/manager.notes.component';
import { ManagerNoteDetailsComponent } from './manager/manager.note.details.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin.dashboard.component';
import { AdminAddUserComponent } from './admin/admin.addUser.component';
import { AdminEditUserComponent } from './admin/admin.editUser.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'user', canActivate: [AuthGuard], component: UserComponent, children: [
        { path: '', component: UserDashboardComponent },
        { path: 'create', component: UserCreateNoteComponent },
        { path: 'edit/:nid', component: UserEditNoteComponent },
        { path: 'view/:nid', component: UserViewNoteComponent }
    ]},
    { path: 'manager', canActivate: [AuthGuard], component: ManagerComponent, children: [
        { path: '', component: ManagerDashboardComponent },
        { path: 'notes', component: ManagerNotesComponent },
        { path: 'notes/:nid', component: ManagerNoteDetailsComponent },
    ]},
    { path: 'admin', canActivate: [AuthGuard], component: AdminComponent, children: [
        { path: '', component: AdminDashboardComponent },
        { path: 'user', component: AdminAddUserComponent },
        { path: 'user/:uid', component: AdminEditUserComponent },
    ]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
