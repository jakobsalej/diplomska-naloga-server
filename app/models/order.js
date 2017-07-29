var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CustomerSchema = new Schema({
	customerID: { 
		type: Number, 
		required: true 
	},
	name: String,
	address: AddressSchema
});


var AddressSchema = new Schema({
	street: String,
	city: String,
	cityCode: Number,
	country: String
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


var OrderSchema = new Schema({
	orderID: { 
		type: Number, 
		required: true 
	},
	title: String,
	paid: {
		type: Number,
		default: 0
	},	
	sender: CustomerSchema,
	customer: CustomerSchema,
	startLocation: LocationSchema,
	endLocation: LocationSchema,
	vehicleTypeRequired: {						// 0 = normal, 1 = with cooler
		type: Number, 
		default: 0 
	},
	cargo: [ItemSchema],
	date: Date,
	transport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transport'
  },
	status: { 
		type: Number, 
		default: 0 
	},									// 0 = not started, 1 = in process, 2 = finished
	dateCreated: { 
		type: Date, 
		//default: Date.now 
	},
	dateUpdated: { 
		type: Date, 
		//default: Date.now 
	},
	text: String
});

module.exports = mongoose.model('Order', OrderSchema);