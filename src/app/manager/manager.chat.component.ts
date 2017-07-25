import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';

import { UserService } from '../shared/user.service';

@Component({
    templateUrl: './manager.chat.component.html'
})
export class ManagerChatComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private userService: UserService) {}

    private ws;

    mlogin: string;
    mid: string;
    ulogin: string;
    uid: string;
    messages: Array<{author: string, dst: string, content: string}> = [];

    new_content: string;

    ngOnInit(): void {
        this.ws = new $WebSocket('ws://localhost:8000');

        this.userService.getMe()
        .then(response => {this.mlogin = response.login; this.mid = response._id})
        .then(() => this.ws.send(JSON.stringify({author: 'ng', dst: 'wss', content: '/mid '+this.mid}), WebSocketSendMode.Direct));

        this.route.paramMap
        .switchMap((params: ParamMap) =>
            this.userService.getUser(params.get('uid')))
        .subscribe((user: any) => {
            this.uid = user._id;
            this.ulogin = user.login;
        });

        this.ws.onMessage(
            (msg: MessageEvent)=> {
                console.log("onMessage ", msg.data);
                this.messages = JSON.parse(msg.data).messages;
            },
            {autoApply: false}
        );
    }

    send(): void {
        this.messages.push({author: this.mlogin, dst: this.ulogin, content: this.new_content});
        this.ws.send(this.messages[this.messages.length - 1], WebSocketSendMode.Direct);
    }
}
