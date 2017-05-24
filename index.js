var assert = require('assert');
var config = require('./config');

var express = require('express');
var app = express();
app.set('token_key', config.token_key);
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(port);
console.log("Listening on port " + port);


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db_url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection to database failed'));
db.once('open', function() {
    console.log('Connection to database successful');
});

var notesRouter = express.Router();
var usersRouter = express.Router();
var managerRouter = express.Router();

app.use('/notes', notesRouter);
app.use('/users', usersRouter);
app.use('/manager', managerRouter);

require('./app/routes')(app);

require('./app/routes.notes')(app, notesRouter);
require('./app/routes.users')(app, usersRouter);
require('./app/routes.manager')(app, managerRouter);
