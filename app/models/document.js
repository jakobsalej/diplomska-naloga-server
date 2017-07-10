var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
	documentID: { 
		type: Number, 
		required: true 
	},
	title: String,
	customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
	startLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
	endLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
	vehicleTypeRequired: { 
		type: Number, 
		default: 0 
	},		// 0 = normal, 1 = hladilnik
	cargo: Array,
	dateDeadline: Date,
	transportData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transport'
  },
	status: { 
		type: Number, 
		default: 0 
	},									// 0 = not started, 1 = in process, 2 = finished
	successfullyDelivered: Boolean,
	dateCreated: { 
		type: Date, 
		default: Date.now 
	},
	dateUpdated: { 
		type: Date, 
		default: Date.now 
	},

	// old fields
	items: String,
	text: String,
	
});

module.exports = mongoose.model('Document', DocumentSchema);