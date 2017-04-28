var assert = require('assert');


var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(port);
console.log("Listening on port " + port);


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myproject';
MongoClient.connect(url, function(err, db) {
    assert.equal(err, null, "Error connecting to the database server");
    console.log("Connected successfully to database server");
    db.close();
});

app.post('/note', function(req, res) {
    console.log('It has been requested to post a note');
    res.type('html');
    var data = req.body;
    console.log(data.title);
    res.send('Request received' + data);
});
