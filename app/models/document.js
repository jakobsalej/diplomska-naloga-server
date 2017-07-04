var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
	documentID: Number,
	title: String,
	text: String,
	items: String
});

module.exports = mongoose.model('Document', DocumentSchema);