var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	customerID: { 
		type: Number, 
		required: true 
	},
	name: String
});

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

var TransportSchema = new Schema({
	transportID: { 
		type: Number,
		required: true
	},
	delivered: Boolean,
	alerts: Array,
	duration: String,
	timeOfDelivery: Date,
	vehicleType: Number,
	driverID: String,
	batchID: String,			// all orders processed in the same batch (same day?)		
});

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



var DocumentSchema = new Schema({
	documentID: { 
		type: Number, 
		required: true 
	},
	title: String,
	customer: CustomerSchema,
	startLocation: LocationSchema,
	endLocation: LocationSchema,
	vehicleTypeRequired: { 
		type: Number, 
		default: 0 
	},		// 0 = normal, 1 = hladilnik
	cargo: [ItemSchema],
	dateDeadline: Date,
	transportData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transport'
  },
	status: { 
		type: Number, 
		default: 0 
	},									// 0 = not started, 1 = in process, 2 = finished
	successfullyDelivered: {
		type: Boolean,
		default: false
	},	
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