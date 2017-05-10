var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    date: {type: Date, required: true},
    title: {type: String, required: true},
    amount: {type: Number, required: true},
    currency: {type: String, required: true},
    comment: {type: String},
    approved: {type: Boolean, required: true},
    userId: {type: String, required: true}
});

module.exports = mongoose.model('note', noteSchema);
