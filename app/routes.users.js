var User = require('./models/user');
var jwt = require('jsonwebtoken');

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
		if(decoded._doc.admin) {
		    console.log('User successfully authentified');
		    next();
		}
		else
		    console.log('User should be admin');
	    }
	});
    });

    router.get('/', function(req, res) {
	console.log('Request to read users');

	User.find(function(err, users) {
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
}
