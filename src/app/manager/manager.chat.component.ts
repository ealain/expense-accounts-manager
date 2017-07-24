import { Component, OnInit } from '@angular/core';

import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';

import { UserService } from '../shared/user.service';

@Component({
    templateUrl: './manager.chat.component.html'
})
export class ManagerChatComponent implements OnInit {
    constructor(
        private userService: UserService) {}

    private ws;

    users: Array<any> = [];
    login: string;
    id: string;
    messages: Array<{author: string, dst: string, content: string}> = [];

    new_content: string;

    ngOnInit(): void {
        this.ws = new $WebSocket('ws://localhost:8000');
        this.userService.getMe()
        .then(response => {this.login = response.login; this.id = response._id});
        this.userService.getUsers()
        .then(response => {
            for(let uid of response) {
                this.userService.getUser(uid)
                    .then(u => this.users.push(u));
            }
        });
    }

    send(ulogin): void {
        this.messages.push({author: this.login, dst: ulogin, content: this.new_content});
        this.ws.send(this.messages[this.messages.length - 1], WebSocketSendMode.Direct);
    }
}
