var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransportSchema = new Schema({
	transportID: { 
		type: Number,
		required: true
	},
	delivered: Boolean,
	alerts: Array,
	measurements: Array,
	duration: String,
	timeOfDelivery: Date,
	vehicleType: Number,
	driverID: String,
	batchID: String,			// all orders processed in the same batch (same day?)		
});

module.exports = mongoose.model('Transport', TransportSchema);