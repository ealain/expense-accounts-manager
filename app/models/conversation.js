var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    mid: {type: String, required: true},
    uid: {type: String, required: true},
    messages: [{author: {type: String, required: true}, content: {type: String, required: true}}]
});

module.exports = mongoose.model('conversation', conversationSchema);
