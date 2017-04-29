var assert = require('assert');


var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(port);
console.log("Listening on port " + port);

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ea-manager');

var Note = require('./app/models/note.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection to database failed'));
db.once('open', function() {
    console.log('Connection to database successful');
});

app.post('/notes', function(req, res) {
    console.log('Request to post a note');

    var note = new Note;
    note.date = req.body.date;
    note.title = req.body.title;
    note.amount = req.body.amount;
    note.currency = req.body.currency;
    note.comment = req.body.comment;

    console.log(note.title);

    res.type('html');

    note.save(function(err) {
	if(err)
	    res.send(err);
	res.send('Request received' + note);
    });
});

app.get('/notes', function(req, res) {
    console.log('Request to read notes');

    res.type('json');

    Note.find(function(err, notes) {
	if(err)
	    res.send(err);
	console.log("Sent: " + notes);
	res.send(notes);
    });
});

app.delete('/notes/:id', function(req, res) {
    console.log('Request to delete note ' + req.params.id);

    res.type('html');

    Note.remove({
	_id: req.params.id
    }, function(err) {
	if(err)
	    res.send(err);
	console.log("Deleted note with id: " + req.params.id);
	res.send('');
    });
});
