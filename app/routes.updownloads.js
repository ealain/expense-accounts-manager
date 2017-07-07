var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
var Note = require('./models/note');

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

    router.post('/:noteid', auth, function(req, res) {
        console.log('Request to upload a file');

        Note.findOne({
            _id: req.params.noteid,
            userId: req.userId
        }, function(err, note) {
            if(note && !note.approved) {
                var filePath = path.join(path.dirname(module.parent.filename), 'data', 'uploads', String(note._id), req.query.name);
                var data = new Buffer('');
                req.on('data', function(chunk) {
                    data = Buffer.concat([data, chunk]);
                });
                req.on('end', function() {
                    fs.mkdir(path.dirname(filePath), function() {
                        fs.writeFile(filePath, data, function() {
                            console.log("Uploaded file saved to: " + filePath);
                            res.end();
                        });
                    });
                });
            }
        });
    });
}
