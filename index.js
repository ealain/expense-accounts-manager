var config = require('./config');

// Setup server
var express = require('express');
var app = express();
app.set('token_key', config.token_key);
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
var assert = require('assert');
var path = require('path');

app.use(express.static(__dirname + '/dist'));

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


// Handle routing
auth = require('./app/authentication')(app);
var authRouter = require('./app/routes')(app);
var notesRouter = require('./app/routes.notes');
var usersRouter = require('./app/routes.users');
var managerRouter = require('./app/routes.manager');
var updownloadRouter = require('./app/routes.updownloads');

app.use('/api/notes', auth, notesRouter);
app.use('/api/users', auth, usersRouter);
app.use('/api/manager', auth, managerRouter);
app.use('/api/uploads', auth, updownloadRouter);
app.use('/api', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
