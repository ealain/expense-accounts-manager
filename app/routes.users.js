var Note = require('./models/note');
var User = require('./models/user');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.get('/users', function(req, res) {
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
