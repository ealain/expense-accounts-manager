import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';

import { UserService } from '../shared/user.service';

@Component({
    selector: 'user-chat',
    templateUrl: 'user.chat.component.html',
})
export class UserChatComponent implements OnInit {
    constructor(
        private userService: UserService) {}

    private ws;

    ulogin: string;
    uid: string;
    conversation: {mid: string, uid: string, messages: Array<{author: string, content: string}>} = {mid: null, uid: null, messages: []};

    new_content: string;

    ngOnInit(): void {
        this.ws = new $WebSocket('ws://localhost:8000');

        this.userService.getMe()
        .then(response => {this.ulogin = response.login; this.uid = response._id})
        .then(() => this.ws.send(JSON.stringify({uid: this.uid, message: {content: '<getHistory>'}}), WebSocketSendMode.Direct));

        this.ws.onMessage(
            (msg: MessageEvent)=> {
                this.conversation.messages = JSON.parse(msg.data).messages;
            },
            {autoApply: false}
        );
    }

    send(): void {
        this.ws.send(JSON.stringify({mid: null, uid: this.uid, message: {author: this.ulogin, content: this.new_content}}), WebSocketSendMode.Direct);
    }
}
