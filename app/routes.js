var Note = require('./models/note');
var User = require('./models/user');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.post('/signup', function(req, res) {
	console.log('Request to signup');

	var user = new User;
	user.login = req.body.login;
	user.password = req.body.password;

	res.type('html');

	user.save(function(err) {
	    if(err)
		res.send(err);
	    else
		res.send('Request received' + user);
	});
    });

    app.post('/login', function(req, res) {
	User.findOne({
	    login: req.body.login
	}, function(err, user) {
	    if(err) throw err;
	    if (!user) {
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else {
		if (user.password != req.body.password) {
		    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		} else {

		    var token = jwt.sign(user, app.get('token_key'), {expiresIn: 60*60*24});

		    res.append('Set-Cookie', 'access_token=' + token + '; HttpOnly');
		    res.json({
			success: true,
			message: 'Enjoy your token!'
		    });
		    console.log('Sent token');
		}
	    }
	});
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
	    else
		res.send('Request received' + note);
	});
    });

    app.get('/notes', function(req, res) {
	console.log('Request to read notes');

	res.type('json');

	Note.find(function(err, notes) {
	    if(err)
		res.send(err);
	    else {
		console.log("Sent: " + notes);
		res.send(notes);
	    }
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
	    else {
		console.log("Deleted note with id: " + req.params.id);
		res.send('');
	    }
	});
    });
}
