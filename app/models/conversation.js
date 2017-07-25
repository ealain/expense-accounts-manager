var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    uid: {type: String, required: true},
    messages: [{author: {type: String, required: true}, content: {type: String, required: true}}]
});

module.exports = mongoose.model('conversation', conversationSchema);
