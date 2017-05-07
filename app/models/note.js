var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    date: Date,
    title: String,
    amount: Number,
    currency: String,
    comment: String,
    approved: Boolean
});

module.exports = mongoose.model('note', noteSchema);
