var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AddressSchema = new Schema({
	street: String,
	city: String,
	cityCode: Number,
	country: String
});


var CustomerSchema = new Schema({
	customerID: { 
		type: Number, 
		required: true 
	},
	name: String,
	address: AddressSchema
});


var CargoSchema = new Schema({
	minTemp: Number,
	maxTemp: Number,
	items: [ItemSchema]
});


var ItemSchema = new Schema({
	itemID: { 
		type: Number, 
		required: true 
	},
	name: String,
	company: String,
	quantity: {
		type: Number,
		default: 1
	},
	minTemp: Number,
	maxTemp: Number
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
	cargo: CargoSchema,
	date: Date,
	transportID: {
		type: String,
		default: null
	},
	status: { 
		type: Number, 
		default: 0 
	},									// 0 = not started, 1 = in process, 2 = finished
	text: String
});

module.exports = mongoose.model('Order', OrderSchema);