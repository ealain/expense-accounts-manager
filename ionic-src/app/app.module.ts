import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { UserDashboardPage } from '../pages/user/user.dashboard';
import { UserEditNotePage } from '../pages/user/user.editNote';
import { UserCreateNotePage } from '../pages/user/user.createNote';
import { UserViewNotePage } from '../pages/user/user.viewNote';
import { ManagerDashboardPage } from '../pages/manager/manager.dashboard';
import { ManagerNotesPage } from '../pages/manager/manager.notes';
import { ManagerNoteDetailsPage } from '../pages/manager/manager.note.details';
import { ManagerChatPage } from '../pages/manager/manager.chat';
import { AdminDashboardPage } from '../pages/admin/admin.dashboard';
import { AdminEditUserPage } from '../pages/admin/admin.editUser';
import { AdminAddUserPage } from '../pages/admin/admin.addUser';

import { AuthService } from '../providers/auth.service';
import { NoteService } from '../providers/note.service';
import { UserService } from '../providers/user.service';

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        UserDashboardPage,
        UserEditNotePage,
        UserCreateNotePage,
        UserViewNotePage,
        ManagerDashboardPage,
        ManagerNotesPage,
        ManagerNoteDetailsPage,
        ManagerChatPage,
        AdminDashboardPage,
        AdminEditUserPage,
        AdminAddUserPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        UserDashboardPage,
        UserEditNotePage,
        UserCreateNotePage,
        UserViewNotePage,
        ManagerDashboardPage,
        ManagerNotesPage,
        ManagerNoteDetailsPage,
        ManagerChatPage,
        AdminDashboardPage,
        AdminEditUserPage,
        AdminAddUserPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        NoteService,
        UserService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
