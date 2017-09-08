var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StatsSchema = new Schema({
	minRecTemp: Number,
	maxRecTemp: Number,
	avgRecTemp: Number,
	timeInRecommendedZone: String
});


var TransportSchema = new Schema({
	idOrder: { 
		type: Number,
		required: true
	},
	delivered: Boolean,
	measurements: Array,
	alerts: Array,
	startDate: Date,
	endDate: Date,
	duration: String,
	stats: StatsSchema,
	vehicleType: Number,
	vehicleReg: String,
	driverID: String,
	text: String,
});

module.exports = mongoose.model('Transport', TransportSchema);