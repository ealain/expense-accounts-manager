import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { UserComponent } from './user/user.component';
import { UserDashboardComponent } from './user/user.dashboard.component';
import { UserCreateNoteComponent } from './user/user.createNote.component';
import { UserEditNoteComponent } from './user/user.editNote.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerDashboardComponent } from './manager/manager.dashboard.component';

import { AuthService } from './auth/auth.service';
import { NoteService } from './shared/note.service';
import { UserService } from './shared/user.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        UserComponent,
        UserDashboardComponent,
        UserEditNoteComponent,
        UserCreateNoteComponent,
        ManagerComponent,
        ManagerDashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [AuthService, NoteService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule { }
