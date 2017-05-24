var User = require('./models/user');
var UsersList = require('./models/man-attrib');
var jwt = require('jsonwebtoken');

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
                    req.params.admin = decoded._doc.admin;
                    req.params.manager = decoded._doc.manager;
                    if(decoded._doc.manager)
                        req.params.managerid = decoded._doc._id;
                    if(decoded._doc.admin || decoded._doc.manager)
                        next();
                    else
                        res.json({success: false, message: 'User is not allowed'});
                }
            });
        }
    };

    router.get('/', auth, function(req, res) {
        console.log('Request to read users');

        if(!req.params.admin)
            res.json({success: false, message: 'User should be admin'});
        else {
            User.find({}, '_id login admin manager', function(err, users) {
                if(err) {
                    console.log('Error looking for users' + err);
                    res.json({success: false, message: 'Unable to read users'});
                }
                else {
                    res.json(users);
                    console.log("Users sent");
                }
            });
        }
    });

    router.get('/:id', auth, function(req, res) {
        console.log('here');
        console.log('Request to read user ' + req.params.id);

        UsersList.findOne({
            managerId: req.params.managerid
        }, 'users', function(err, us) {
            if(err) {
                console.log('Error looking for list of users for manager ' + req.params.managerid);
                res.json({success: false, message: 'Unable to read users of manager'});
            }
            else {
                console.log('Here ' + us.users);
                if(us.users.includes(req.params.id)) {
                    User.findOne({
                        _id: req.params.id
                    }, '_id login', function(err, user) {
                        if(err) {
                            console.log('Error looking for user ' + req.params.id);
                            res.json({success: false, message: 'Unable to read user ' + req.params.id});
                        }
                        else {
                            res.json(user);
                            console.log('User sent');
                        }
                    });
                }
                else {
                    console.log("Manager has no access to this user's info");
                    res.json({success: false, message: "Manager has no access to this user's info"});
                }
            }
        });
    });

    router.post('/', auth, function(req, res) {
        console.log('Request to add user');
        if(req.params.admin) {
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
        }
        else {
            console.log('User must be admin');
            res.json({success: false, message: 'User must be admin'});
        }
    });

    router.post('/lists', auth, function(req, res) {
        console.log('Request to add users list for manager');
        if(req.params.admin) {
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
        }
        else {
            console.log('User must be admin');
            res.json({success: false, message: 'User must be admin'});
        }
    });
}
