// Dependencies require
let mongoose = require('mongoose');

// schema define
let UserSchema = mongoose.Schema({
	username: {type:String},
	password: {type:String}
}, { timestamps: true });

// model init
let User = module.exports = mongoose.model('users', UserSchema);
