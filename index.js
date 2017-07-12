var assert = require('assert');
var config = require('./config');

var express = require('express');
var app = express();
app.set('token_key', config.token_key);
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Listening on port " + port);


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db_url, {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection to database failed'));
db.once('open', function() {
    console.log('Connection to database successful');
});

var notesRouter = express.Router();
notesRouter.use(bodyParser.json());
var usersRouter = express.Router();
usersRouter.use(bodyParser.json());
var managerRouter = express.Router();
managerRouter.use(bodyParser.json());
var updownloadRouter = express.Router();
updownloadRouter.use(bodyParser.raw());

app.use('/notes', notesRouter);
app.use('/users', usersRouter);
app.use('/manager', managerRouter);
app.use('/uploads', updownloadRouter);

require('./app/routes')(app);

require('./app/routes.notes')(app, notesRouter);
require('./app/routes.users')(app, usersRouter);
require('./app/routes.manager')(app, managerRouter);
require('./app/routes.updownloads')(app, updownloadRouter);
