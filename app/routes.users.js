var User = require('./models/user');
var UsersList = require('./models/man-attrib');
var jwt = require('jsonwebtoken');

module.exports = function(app, router) {

    router.use(function(req, res, next) {
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
		    if(decoded._doc.admin) {
			console.log('User successfully authentified');
			next();
		    }
		    else
			console.log('User should be admin');
		}
	    });
	}
    });

    router.get('/', function(req, res) {
	console.log('Request to read users');

	User.find({}, '_id login admin manager', function(err, users) {
	    if(err) {
		console.log('Error looking for users' + err);
		res.json({success: false, message: 'Unable to read users'});
	    }
	    else {
		console.log("Users sent");
		res.json(users);
	    }
	});
    });

    router.post('/', function(req, res) {
	console.log('Request to add user');

	var user = new User;
	// Check data
	if(!req.body.login || !req.body.password)
	    res.json({success: false, message: "Invalid login or password"});
	else if(req.body.admin && req.body.manager)
	    res.json({success: false, message: "User cannot be both admin and manager"});
	else {
	    user.login = req.body.login;
	    user.password = req.body.password;

	    User.findOne({
		login: req.body.login
	    }, function(err, u) {
		if(u) {
		    console.log('Error user exists with same login');
		    res.json({success: false, message: 'Error user exists with same login'});
		}
		else {
		    user.admin = req.body.admin;
		    user.manager = req.body.manager;

		    user.save(function(err) {
			if(err) {
			    console.log('Error while saving user ' + err);
			    res.json({success: false, message: 'Error while saving user'});
			}
			else {
			    console.log('Saved user ' + user.login);
			    res.json({success: true, message: 'User saved !'});
			}
		    });
		}
	    });
	}
    });

    router.post('/lists', function(req, res) {
	console.log('Request to add users list for manager');

	var list = new UsersList;
	var managerId;

	User.findOne({
	    login: req.body.managerlogin
	}, function(err, u) {
	    if(u) {
		list.managerId = u._id;
		list.users = req.body.users;
		list.save(function(err) {
		    if(err) {
			console.log('Error while saving list of users: ' + err);
			res.json({success: false, message: 'Error while saving list of users'});
		    }
		    else {
			console.log('Saved list of users for ' + u.login);
			res.json({success: true, message: 'List of users saved !'});
		    }
		});
	    }
	    else {
		console.log('Could not find requested manager');
		res.json({success: false, message: 'Could not find manager to update'});
	    }
	});
    });
}
