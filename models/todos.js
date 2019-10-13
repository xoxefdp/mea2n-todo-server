// Dependencies require
let mongoose = require('mongoose')

// schema define
let TodoSchema = mongoose.Schema({
  todoId: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String },
  isDone: { type: Boolean },
  userId: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true })

// model init
module.exports = mongoose.model('todos', TodoSchema)
