var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
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
                    if(decoded._doc.manager) {
                        req.managerId = decoded._doc._id;
                    }
                    else if(decoded._doc.admin) {
                        req.adminId = decoded._doc._id;
                    }
                    else {
                        req.userId = decoded._doc._id;
                    }
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

    router.get('/:noteid/:filename', auth, function(req, res) {
        console.log('Request to dl file ' + req.params.filename);
        Note.findOne({
            _id: req.params.noteid,
        }, function(err, note) {
            if(req.managerId) {
                ManAttribs.findOne({
                    managerId: req.managerId
                }, function(err, attribs) {
                    if(err || !attribs) {
                        console.log('Erreur');
                        res.json({success: false, message: 'Error on server side'});
                    }
                    else if(attribs.users.includes(note.userId)) {
                        console.log('File sent');
                        var file = fs.readFileSync(path.dirname(__dirname) + '/data/uploads/' + req.params.noteid + '/' + req.params.filename, 'binary');
                        res.setHeader('Content-Length', file.length);
                        res.write(file, 'binary');
                        res.end();
                    }
                    else {
                        console.log('User not allowed');
                        res.json({success: false, message: 'User not allowed'});
                    }
                });
            }
            else {
                console.log('User not allowed');
                res.json({success: false, message: 'User not allowed'});
            }
        });
    });
}
