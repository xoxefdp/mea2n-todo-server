// Dependencies require
let mongoose = require('mongoose');

// schema define
let TaskSchema = mongoose.Schema({
	title: {type:String},
	isDone: {type:Boolean}
}, { timestamps: true });

// model init
let Task = module.exports = mongoose.model('tasks', TaskSchema);
