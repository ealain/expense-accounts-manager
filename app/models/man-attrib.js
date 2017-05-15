var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var manAttribSchema = new Schema({
    managerId: {
	type: String,
	required: true
    },
    users: {
	type: Array,
	required: true
    }
}, { collection: 'manager_attribs' });

module.exports = mongoose.model('usersList', manAttribSchema);
