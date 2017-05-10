var jwt = require('jsonwebtoken');
var Note = require('./models/note');

module.exports = function(app, router) {

    router.use(function(req, res, next) {
	console.log('Extracting token from header...');
	var token = req.headers.cookie.split('=')[1];

	jwt.verify(token, app.get('token_key'), function(err, decoded) {
	    if(err) {
		console.log('Invalid token... aborting' + err);
		res.json({success: false, message: 'Invalid token'});
	    }
	    else {
		console.log('User successfully authentified');
		req.userId = decoded._doc._id;
		next();
	    }
	});
    });

    router.post('/', function(req, res) {
	console.log('Request to post a note from ' + req.userId);

	var note = new Note;
	note.date = req.body.date;
	note.title = req.body.title;
	note.amount = req.body.amount;
	note.currency = req.body.currency;
	note.comment = req.body.comment;
	note.approved = false;
	note.userId = req.userId;

	note.save(function(err) {
	    if(err) {
		console.log('Error while saving' + err);
		res.json({success: false, message: 'Error while saving'});
	    }
	    else {
		console.log('Saved note ' + note.title);
		res.json({success: true, message: 'Token accepted and account saved'});
	    }
	});
    });

    router.post('/:id', function(req, res) {
	console.log('Request to modify a note');

	Note.findOne({
	    _id: req.params.id,
	    userId: req.userId
	}, function(err, note) {
	    note.date = req.body.date;
	    note.title = req.body.title;
	    note.amount = req.body.amount;
	    note.currency = req.body.currency;
	    note.comment = req.body.comment;
	    note.approved = false;

	    note.save(function(err) {
		if(err) {
		    console.log('Error while saving' + err);
		    res.json({success: false, message: 'Error while saving'});
		}
		else {
		    console.log('Saved note ' + note.title);
		    res.json({success: true, message: 'Token accepted and account saved'});
		}
	    });
	});
    });

    router.get('/', function(req, res) {
	console.log('Request to read notes');

	Note.find({
	    userId: req.userId
	}, function(err, notes) {
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

    router.get('/:id', function(req, res) {
	console.log('Request to read note ' + req.params.id);

	Note.findOne({
	    _id: req.params.id,
	    userId: req.userId
	}, function(err, note) {
	    if(err) {
		console.log('Error looking for notes' + err);
		res.json({success: false, message: 'Unable to read notes'});
	    }
	    else {
		console.log("Accounts sent");
		console.log(note);
		res.json(note);
	    }
	});
    });

    router.delete('/:id', function(req, res) {
	console.log('Request to delete note ' + req.params.id);

	Note.find({
	    _id: req.params.id,
	    userId: req.userId
	}, function(err, note) {
	    if(err) {
		console.log('Error: cannot find note to be deleted');
		res.json({success: false, message: 'Note to delete does not exist'});
	    }
	    else {
		if(note.approved) {
		    console.log('Note has been approved, user cannot delete it');
		    res.json({success: false, message: 'Approved notes cannot be deleted'});
		}
		else {
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
		}
	    }
	});
    });
}
