var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
	id: Number,
	title: String,
	text: String
});

module.exports = mongoose.model('Document', DocumentSchema);