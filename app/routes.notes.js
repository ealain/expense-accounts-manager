var jwt = require('jsonwebtoken');
var Note = require('./models/note');
var ManAttribs = require('./models/man-attrib');

module.exports = function(app, router) {

    function auth(req, res, next) {
	console.log('Extracting token from header...');
	if(!req.headers.cookie) {
	    console.log('No token ! Aborting.');
	    res.json({success: false, message: 'No token provided'});
	}
	else {
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
	}
    };

    router.post('/', auth, function(req, res) {
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

    router.post('/:id', auth, function(req, res) {
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

    router.get('/', auth, function(req, res, next) {
        console.log('Request to read notes');
        if(req.query.user) {
            // Notes of another user have been requested
            // Check that the operation is allowed (manager has access to user info)
            ManAttribs.findOne({
                managerId: req.userId
            }, 'users', function(err, users) {
                if(err || !(users.users.includes(req.query.user))) {
                    // Requested user was not attributed to the enquirer
                    console.log('Unauthorized');
                    res.json({success: false, message: 'Unauthorized'});
                }
                else
                    // Deliver info of user passed in query
                    next();
            });
        }
        else
            // Deliver info of enquirer
            next();
    }, function(req, res) {
        var uid = req.query.user || req.userId;
        Note.find({
            userId: uid
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

    router.get('/:id', auth, function(req, res) {
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
		res.json(note);
	    }
	});
    });

    router.delete('/:id', auth, function(req, res) {
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
