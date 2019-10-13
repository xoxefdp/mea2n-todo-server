// Dependencies require
let mongoose = require('mongoose')

// schema define
let UserSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  username: { type: String },
  password: { type: String }
}, { timestamps: true })

// model init
module.exports = mongoose.model('users', UserSchema)
