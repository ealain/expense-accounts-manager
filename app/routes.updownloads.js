var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.raw());

var path = require('path');
var fs = require('fs');
var Note = require('./models/note');
var ManAttribs = require('./models/man-attrib');

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

router.delete('/:noteid', auth, function(req, res) {
    console.log('Request to delete file ' + req.query.name + ' associated with note ' + req.params.noteid);
    Note.findOne({
        _id: req.params.noteid,
        userId: req.userId
    }, function(err, note) {
        if(err) {
            console.log('Error: cannot find note with file to be deleted');
            res.json({success: false, message: 'Note with file to delete does not exist'});
        }
        else {
            if(note.approved) {
                console.log('Note has been approved, user cannot change attached files');
                res.json({success: false, message: 'Approved notes cannot be changed'});
            }
            else {
                fs.unlink(path.join('data/uploads/', String(note._id), '/', req.query.name), (err) => {
                    if(err) {
                        if(note.files.length === 0) {
                            fs.rmdir(path.join('data/uploads/', String(note._id)), (err) => {
                                if(err) {console.log('Unable to delete note directory:' + err);}});
                        }
                        console.log('File seems already deleted in file system');
                        res.json(note);
                    } else {
                        if(note.files.length === 0) {
                            fs.rmdir(path.join('data/uploads/', String(note._id)), (err) => {
                                if(err) {console.log('Unable to delete note directory:' + err);}});
                        }
                        console.log("Deleted file: " + req.query.name);
                        res.json(note);
                    }
                });
            }
        }
    });
});

module.exports = router;
