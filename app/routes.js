var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var jwt = require('jsonwebtoken');
var User = require('./models/user');

module.exports = function(app) {

    router.use(bodyParser.json());
    router.use(cookieParser());

    router.post('/signup', function(req, res) {
	console.log('Request to signup');

	var user = new User;
	user.login = req.body.login;
	user.password = req.body.password;
	user.admin = false;
	user.manager = false;

        User.findOne({
            login: user.login
        }, function(err, u) {
            if(u) {
                console.log('Error user exists with same login');
                res.json({success: false, same_login: true, message: 'Error user exists with same login'});
            }
            else {
                user.save(function(err) {
                    if(err)
                        res.json({success: false, message: err});
                    else
                        res.json({success: true, message: 'User saved !'});
                });
            }
        });
    });

    router.post('/login', function(req, res) {
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
		    res.json({success: true, admin: user.admin, manager: user.manager, message: 'Enjoy your token!'});
		    console.log('Sent token');
		}
	    }
	});
    });

    router.get('/login', function(req, res) {
        console.log('Request to authenticate');
        console.log('Extracting token from header...');
        if(!req.cookies.access_token) {res.json({success: false, message: 'No token'});}
        else {
            var token = req.cookies.access_token;
            jwt.verify(token, app.get('token_key'), function(err, decoded) {
                if(err) {
                    console.log('Invalid token... aborting' + err);
                    res.json({success: false, message: 'Invalid token'});
                }
                else {
                    console.log('User successfully authentified');
                    res.json({success: true, admin: decoded._doc.admin, manager: decoded._doc.manager, message: 'Token is valid!'});
                }
            });
        }
    });

    router.get('/logout', function(req, res) {
        console.log('Extracting token from header...');
        var token = req.cookies.access_token;
        jwt.verify(token, app.get('token_key'), function(err, decoded) {
            if(err) {
                console.log('Invalid token... aborting' + err);
                res.json({success: false, message: 'Invalid token'});
            }
            else {
                console.log('User successfully authentified');
                console.log('Request to logout');
                User.findOne({
                    login: decoded._doc.login
                }, function(err, user) {
                    if(err) throw err;
                    if (!user) {
                        res.json({ success: false, message: 'Authentication failed. User not found.' });
                    } else {
                        res.append('Set-Cookie', 'access_token=deleted' + '; HttpOnly' +
                            '; expires=Thu, 01 Jan 1970 00:00:00 GMT');
                        res.json({success: true, message: 'Token cancelled'});
                        console.log('Sent token deletion');
                    }
                });
            }
        });
    });

    return router;
}
