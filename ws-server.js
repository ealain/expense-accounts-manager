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
    //var c = new Conversation({mid: '591a136523a08811bc8bbfe8', uid: '5910d5f913e0d32be786e4ae', messages: {author: 'Manager', dst: 'Éloi', content: 'Initial message'}});
    //c.save();
    connection.on('message', function(message) {
        console.log(message.type);
        console.log(message.utf8Data);
        var mjson = JSON.parse(message.utf8Data);
        console.log(mjson);
        console.log(/^\/mid [a-z0-9]{24}$/.test(mjson.content));
        if(/^\/mid [a-z0-9]{24}$/.test(mjson.content)) {
            var m_id = mjson.content.slice(5,);
            console.log(m_id);
            Conversation.findOne({
                mid: m_id
            }, 'messages', function(err, c) {
                console.log('Here');
                if(err) {console.log('Error retrieving conversation!');}
                else if(c) {
                    console.log('History found');
                    console.log(JSON.stringify(c));
                    connection.sendUTF(JSON.stringify(c));
                }
                else {
                    console.log('No history found');
                    connection.sendUTF(JSON.stringify({}));
                }
            });
        }
        else if(/^\/uid [a-z0-9]{24}$/.test(mjson.content.utf8Data)) {
            var u_id = mjson.content.splice(4,24);
            console.log(u_id);
            Conversation.find({
                uid: u_id
            }, (err, c) => {
                if(err) {console.log('Error retrieving conversation!');}
                else if(c) {
                    console.log('History found');
                    console.log(JSON.stringify(c));
                    connection.sendUTF(JSON.stringify(c));
                }
                else {
                    console.log('No history found');
                    connection.sendUTF(JSON.stringify({}));
                }
            });
        }
        else {
            Conversation.find({
                
            });
        }
    });
});
