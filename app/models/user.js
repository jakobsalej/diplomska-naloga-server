var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
    	type: String,
    	unique: true,
    	required: true,
    	trim: true
  	},
  	username: {
    	type: String,
    	unique: true,
    	required: true,
    	trim: true
  	},
  	password: {
    	type: String,
    	required: true,
  	}
});

module.exports = mongoose.model('User', UserSchema);