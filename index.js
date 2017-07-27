var config = require('./config');

// Setup server
var express = require('express');
var app = express();
app.set('token_key', config.token_key);
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
var assert = require('assert');
var path = require('path');

app.use(express.static(__dirname + '/www'));

app.listen(port);
console.log("Listening on port " + port);


// Connect to database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db_url, {useMongoClient: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection to database failed'));
db.once('open', function() {
    console.log('Connection to database successful');
});

// Middleware to use front-end served on port 8100
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//

// Handle routing
auth = require('./app/authentication')(app);
var authRouter = require('./app/routes')(app);
var notesRouter = require('./app/routes.notes');
var usersRouter = require('./app/routes.users');
var updownloadRouter = require('./app/routes.updownloads');

app.use('/api/notes', auth, notesRouter);
app.use('/api/users', auth, usersRouter);
app.use('/api/uploads', auth, updownloadRouter);
app.use('/api', authRouter);

app.get('/uploads/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/uploads/' + req.params[0]));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
