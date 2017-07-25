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
    conversation: {mid: string, uid: string, messages: Array<{author: string, content: string}>} = {mid: null, uid: null, messages: []};

    new_content: string;

    ngOnInit(): void {
        this.ws = new $WebSocket('ws://localhost:8000');

        this.userService.getMe()
        .then(response => {this.mlogin = response.login; this.mid = response._id});

        this.route.paramMap
        .switchMap((params: ParamMap) =>
            this.userService.getUser(params.get('uid')))
        .subscribe((user: any) => {
            this.uid = user._id;
            this.ulogin = user.login;
            this.ws.send(JSON.stringify({mid: this.mid, uid: this.uid, message: {content: '<getHistory>'}}), WebSocketSendMode.Direct);
        });

        this.ws.onMessage(
            (msg: MessageEvent)=> {
                console.log("onMessage ", msg.data);
                this.conversation.messages = JSON.parse(msg.data).messages;
                console.log("Conversation messages:", this.conversation.messages);
            },
            {autoApply: false}
        );
    }

    send(): void {
        //this.conversation.messages.push({author: this.mlogin, content: this.new_content});
        this.ws.send(JSON.stringify({mid: this.mid, uid: this.uid, message: {author: this.mlogin, content: this.new_content}}), WebSocketSendMode.Direct);
    }
}
