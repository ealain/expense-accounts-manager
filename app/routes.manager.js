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
                    if(decoded._doc.admin) {
                        next();
                    }
                    else if(decoded._doc.manager) {
                        req.params.managerid = decoded._doc._id;
                        next();
                    }
                    else
                        res.json({success: false, message: 'User is not allowed'});
                }
            });
        }
    };

    router.get('/ulist', auth, function(req, res) {
        mid = req.params.managerid || req.query.managerid;
        if(mid) {
            console.log('Request to read list of users for manager ' + mid);

            UsersList.findOne({
                managerId: mid
            }, 'users', function(err, users) {
                if(err) {
                    console.log('Error looking for list of users for manager ' + mid);
                    res.json({success: false, message: 'Unable to read users of manager'});
                }
                else if(users) {
                    console.log(users.users);
                    res.json(users.users);
                }
                else {
                    res.send([]);
                }
            });
        }
        else {
            console.log('No info on manager');
            res.json({success: false, message: 'Request should come from a manager'});
        }
    });
}
