var jwt = require('jsonwebtoken');

module.exports = function(app) {
    return function(req, res, next) {
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
                    if(decoded._doc.manager) {
                        req.adminId = null;
                        req.managerId = decoded._doc._id;
                        req.userId = null;
                    }
                    else if(decoded._doc.admin) {
                        req.adminId = decoded._doc._id;
                        req.managerId = null;
                        req.userId = null;
                    }
                    else {
                        req.adminId = null;
                        req.managerId = null;
                        req.userId = decoded._doc._id;
                    }
                    next();
                }
            });
        }
    }
};

