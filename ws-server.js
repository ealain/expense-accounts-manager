'use strict'

var http = require('http');
var webSocketServer = require('websocket').server;

var config = require('./config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db_url, {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection to database failed'));
db.once('open', function() {
    console.log('Connection to database successful');
});

var server = http.createServer().listen('8000', function() {console.log('Server listening on port 8000');});

var wsServer = new webSocketServer({httpServer: server});

var Conversation = require('./app/models/conversation');

wsServer.on('request', function(request) {
    console.log((new Date), 'Connection request from:', request.origin);
    if(request.origin != 'http://localhost:8080') {return;}
    var connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
        var mjson = JSON.parse(message.utf8Data);
        console.log(mjson);
        if(mjson.message.content === '<getHistory>') {
            Conversation.findOne({
                uid: mjson.uid
            }, 'messages', function(err, c) {
                if(err) {console.log('Error retrieving conversation!');}
                else if(c) {
                    console.log('History found:', JSON.stringify(c));
                    connection.sendUTF(JSON.stringify(c));
                }
                else {
                    console.log('No history found');
                    connection.sendUTF(JSON.stringify({}));
                }
            });
        }
        else {
            Conversation.findOne({
                uid: mjson.uid
            }, (err, c) => {
                if(err) {console.log('Error retrieving conversation!');}
                else if(c) {
                    console.log('Conversation changed to:', c);
                    c.messages.push(mjson.message);
                    c.save();
                    connection.sendUTF(JSON.stringify(c));
                }
                else {
                    var new_c = new Conversation({uid: mjson.uid, messages: [mjson.message]});
                    console.log('Nouvelle conversation:', new_c);
                    new_c.save();
                }
            });
        }
    });
});
