var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

var UsersList = require('./models/man-attrib');

router.get('/ulist', auth, function(req, res) {
    mid = req.managerId || req.query.managerid;
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

module.exports = router;
