var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    date: Date,
    title: String,
    amount: Number,
    currency: String,
    comment: String
});

module.exports = mongoose.model('note', noteSchema);
