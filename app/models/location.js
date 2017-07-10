var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
	x: { 
		type: Number, 
		required: true 
	},
	y: { 
		type: Number, 
		required: true 
	}
});

module.exports = mongoose.model('Location', LocationSchema);