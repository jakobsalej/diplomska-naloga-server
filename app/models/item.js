var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	itemID: { 
		type: Number, 
		required: true 
	},
	name: String,
	company: String,
	minTemp: Number,
	maxTemp: Number
});

module.exports = mongoose.model('Item', ItemSchema);