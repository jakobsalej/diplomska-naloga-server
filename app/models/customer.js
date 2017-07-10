var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	customerID: { 
		type: Number, 
		required: true 
	},
	name: String
});

module.exports = mongoose.model('Customer', CustomerSchema);