var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());

var fs = require('fs');
var path = require('path');
var Note = require('./models/note');
var ManAttribs = require('./models/man-attrib');

router.post('/', function(req, res) {
    console.log('Request to post a note from ' + req.userId);
    var note = new Note;
    note.date = req.body.date;
    note.title = req.body.title;
    note.amount = req.body.amount;
    note.currency = req.body.currency;
    note.comment = req.body.comment;
    note.files = req.body.files;
    note.approved = false;
    note.userId = req.userId;
    note.save(function(err, saved_note) {
        if(err) {
            console.log('Error while saving' + err);
            res.json({success: false, message: 'Error while saving'});
        }
        else {
            console.log('Saved note ' + note.title);
            res.json({success: true, message: 'Token accepted and account saved', noteid: saved_note._id});
        }
    });
});

router.post('/approve', function(req, res) {
    console.log('Request to (dis)approve a note');
    console.log('Query of req:' + req.query.id);
    Note.findOne({
        _id: req.query.id,
    }, function(err, note) {
        ManAttribs.findOne({
            managerId: req.managerId
        }, function(err, attribs) {
            if(note && attribs.users.includes(note.userId)) {
                note.approved = !note.approved;
                note.save(function(err) {
                    if(err) {
                        console.log('Error while saving' + err);
                        res.json({success: false, message: 'Error while saving'});
                    }
                    else {
                        console.log('Saved note ' + note.title);
                        res.json(note);
                    }
                });
            }
            else {
                console.log('User not allowed');
                res.json({success: false, message: 'User not allowed'});
            }
        });
    });
});

router.post('/:id', function(req, res) {
    console.log('Request to modify a note');
    Note.findOne({
        _id: req.params.id,
        userId: req.userId
    }, function(err, note) {
        if(note && !note.approved) {
            note.date = req.body.date;
            note.title = req.body.title;
            note.amount = req.body.amount;
            note.currency = req.body.currency;
            note.comment = req.body.comment;
            note.files = req.body.files;
            note.approved = false;
            note.save(function(err, saved_note) {
                if(err) {
                    console.log('Error while saving' + err);
                    res.json({success: false, message: 'Error while saving'});
                }
                else {
                    console.log('Saved note ' + note.title);
                    res.json({success: true, message: 'Token accepted and account saved', noteid: saved_note._id});
                }
            });
        }
        else {
            console.log("No unapproved note with id : " + req.params.id);
        }
    });
});

router.get('/', function(req, res, next) {
    console.log('Request to read notes');
    if(req.query.user) {
        // Notes of another user have been requested
        // Check that the operation is allowed (manager has access to user info)
        ManAttribs.findOne({
            managerId: req.managerId
        }, 'users', function(err, users) {
            if(err || !(users.users.includes(req.query.user))) {
                // Requested user was not attributed to the enquirer
                console.log('Unauthorized');
                res.json({success: false, message: 'Unauthorized'});
            }
            else
                // Deliver info of user passed in query
                next();
        });
    }
    else
        // Deliver info of enquirer
        next();
}, function(req, res) {
    var uid = req.query.user || req.userId;
    Note.find({
        userId: uid
    }, function(err, notes) {
        if(err) {
            console.log('Error looking for notes' + err);
            res.json({success: false, message: 'Unable to read notes'});
        }
        else {
            console.log("Accounts sent");
            res.json(notes);
        }
    });
});

router.get('/:id', function(req, res) {
    console.log('Request to read note ' + req.params.id);
    Note.findOne({
        _id: req.params.id,
    }, function(err, note) {
        if(err) {
            console.log('Error looking for notes ' + err);
            res.json({success: false, message: 'Unable to read notes'});
        }
        else {
            if(req.userId && req.userId === note.userId) {
                console.log("Accounts sent");
                res.json(note);
            }
            else if(req.managerId) {
                ManAttribs.findOne({
                    managerId: req.managerId
                }, function(err, attribs) {
                    if(err || !attribs) {
                        console.log('Erreur');
                        res.json({success: false, message: 'Error on server side'});
                    }
                    else if(attribs.users.includes(note.userId)) {
                        console.log('Accounts sent');
                        res.json(note);
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
        }
    });
});

router.delete('/:id', function(req, res) {
    if(!req.query.file) {
        console.log('Request to delete note ' + req.params.id);
        Note.findOne({
            _id: req.params.id,
            userId: req.userId
        }, function(err, note) {
            if(err) {
                console.log('Error: cannot find note to be deleted');
                res.json({success: false, message: 'Note to delete does not exist'});
            }
            else {
                if(note.approved) {
                    console.log('Note has been approved, user cannot delete it');
                    res.json({success: false, message: 'Approved notes cannot be deleted'});
                }
                else {
                    Note.remove({
                        _id: req.params.id
                    }, function(err, note) {
                        if(err) {
                            console.log('Error deleting note' + err);
                            res.json({success: false, message: 'Unable to delete note'});
                        }
                        else {
                            console.log("Deleted note with id: " + req.params.id);
                            res.json({success: true, message: 'Note deleted'});
                        }
                    });
                }
            }
        });
    } else {
        console.log('Request to delete file ' + req.query.file + ' of note ' + req.params.id);
        Note.findOne({
            _id: req.params.id,
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
                    note.files.splice(note.files.indexOf(req.query.file), 1);
                    note.save(function(err, saved_note) {
                        if(err) {
                            console.log('Error while retrieving file from note ' + err);
                            res.json({success: false, message: 'Error while retrieving file from note'});
                        }
                        else {
                            fs.unlink(path.join('data/uploads/', String(note._id), '/', req.query.file), (err) => {
                                if(err) {
                                    if(note.files.length === 0) {
                                        fs.rmdir(path.join('data/uploads/', String(note._id)), (err) => {
                                            if(err) {console.log('Unable to delete note directory:' + err);}});
                                    }
                                    console.log('File already deleted in file system');
                                    res.json(note);
                                } else {
                                    if(note.files.length === 0) {
                                        fs.rmdir(path.join('data/uploads/', String(note._id)), (err) => {
                                            if(err) {console.log('Unable to delete note directory:' + err);}});
                                    }
                                    console.log("Deleted file: " + req.query.file);
                                    res.json(note);
                                }
                            });
                        }
                    });
                }
            }
        });
    }
});

module.exports = router;
