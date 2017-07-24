'use strict'

var http = require('http');
var webSocketServer = require('websocket').server;

var server = http.createServer().listen('8000', function() {console.log('Server listening on port 8000');});

var wsServer = new webSocketServer({httpServer: server});

wsServer.on('request', function(request) {
    console.log((new Date), 'Connection request from:', request.origin);
    if(request.origin != 'http://localhost:8080') {return;}
    var connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
        console.log(message.type);
        console.log(message.utf8Data);
        connection.sendUTF('Cheers');
    });
});
