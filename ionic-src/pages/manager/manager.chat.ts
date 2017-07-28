import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';

import { UserService } from '../../providers/user.service';

@Component({
    templateUrl: './manager.chat.html'
})
export class ManagerChatPage implements OnInit {
    constructor(
        private navParams: NavParams,
        private userService: UserService) {}

    private ws;

    mlogin: string;
    mid: string;
    ulogin: string;
    uid: string;
    conversation: {uid: string, messages: Array<{author: string, content: string}>} = {uid: null, messages: []};

    new_content: string;

    ngOnInit(): void {
        this.ws = new $WebSocket('ws://localhost:8000');

        this.userService.getMe()
        .then(response => {this.mlogin = response.login; this.mid = response._id});

        this.userService.getUser(this.navParams.get('uid'))
        .then((user: any) => {
            this.uid = user._id;
            this.ulogin = user.login;
            this.ws.send(JSON.stringify({uid: this.uid, message: {content: '<getHistory>'}}), WebSocketSendMode.Direct);
        });

        this.ws.onMessage(
            (msg: MessageEvent)=> {
                this.conversation.messages = JSON.parse(msg.data).messages;
            },
            {autoApply: false}
        );
    }

    send(): void {
        this.ws.send(JSON.stringify({uid: this.uid, message: {author: this.mlogin, content: this.new_content}}), WebSocketSendMode.Direct);
        this.new_content = "";
    }
}
