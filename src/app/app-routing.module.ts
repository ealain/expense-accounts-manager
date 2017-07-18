import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { UserComponent } from './user/user.component';
import { UserCreateNoteComponent } from './user/user.createNote.component';
import { UserEditNoteComponent } from './user/user.editNote.component';
import { UserDashboardComponent } from './user/user.dashboard.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerDashboardComponent } from './manager/manager.dashboard.component';
import { ManagerNotesComponent } from './manager/manager.notes.component';
import { ManagerNoteDetailsComponent } from './manager/manager.note.details.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent, children: [
        { path: '', component: UserDashboardComponent },
        { path: 'create', component: UserCreateNoteComponent },
        { path: 'edit/:nid', component: UserEditNoteComponent }
    ]},
    { path: 'manager', component: ManagerComponent, children: [
        { path: '', component: ManagerDashboardComponent },
        { path: 'notes', component: ManagerNotesComponent },
        { path: 'notes/:nid', component: ManagerNoteDetailsComponent },
    ]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
