var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    login: {
	type: String,
	required: true
    },
    password: {
	type: String,
	required: true
    },
    admin: {
	type: Boolean,
	required: true
    },
    manager: {
	type: Boolean,
	required: true
    }
});

module.exports = mongoose.model('user', userSchema);
