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
	console.log('Request to login');
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
		    res.json({success: true, message: 'Enjoy your token!'});
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

	console.log('Extracting token from header...');
	var token = req.headers.cookie.split('=')[1];

	jwt.verify(token, app.get('token_key'), function(err, decoded) {
	    if(err) {
		console.log('Invalid token... aborting' + err);
		res.json({success: 'false', message: 'Invalid token'});
	    }
	    else {
		console.log('User successfully authentified');

		note.save(function(err) {
		    if(err) {
			console.log('Error while saving' + err);
			res.json({success: false, message: 'Invalid token'});
		    }
		    else {
			console.log('Saved note ' + note.title);
			res.json({success: true, message: 'Token accepted and account saved'});
		    }
		});
	    }
	});
    });

    app.get('/notes', function(req, res) {
	console.log('Request to read notes');

	Note.find(function(err, notes) {
	    if(err) {
		console.log('Error looking for notes' + err);
		res.json({success: false, message: 'Unable to read notes'});
	    }
	    else {
		console.log("Accounts sent");
		res.json(notes);
	    }
	});
    });

    app.delete('/notes/:id', function(req, res) {
	console.log('Request to delete note ' + req.params.id);

	Note.remove({
	    _id: req.params.id
	}, function(err, note) {
	    if(err) {
		console.log('Error deleting note' + err);
		res.json({success: false, message: 'Unable to delete note'});
	    }
	    else {
		console.log("Deleted note with id: " + req.params.id);
		res.json({success: true, message: 'Note deleted'});
	    }
	});
    });
}
