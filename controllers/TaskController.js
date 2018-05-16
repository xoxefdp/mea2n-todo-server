const Task = require('../models/tasks')

// Get All Tasks
const getAll = function (request, response, next) {
  Task.find({}, function (error, success) {
    if (error) {
      response.send(error)
      console.log(error)
    } else {
      response.json(success)
    }
  })
}
module.exports.getAll = getAll

// Get Single Task
const getSingle = function (request, response, next) {
  Task.findById(request.params.id, function (error, success) {
    if (error) {
      response.send(error)
      console.log(error)
    } else {
      response.json(success)
    }
  })
}
module.exports.getSingle = getSingle

// Save Task
const create = function (request, response, next) {
  let data = request.body

  if (!data.title || !(data.isDone + '')) {
    response.status(400).json({ 'error': 'Bad Data' })
  } else {
    let task = new Task(data)
    task.save(function (error, success) {
      if (error) {
        response.send(error)
        console.log(error)
      } else {
        response.json(success)
      }
    })
  }
}
module.exports.create = create

// Delete Task
const remove = function (request, response, next) {
  Task.findByIdAndRemove(request.params.id, function (error, success) {
    if (error) {
      response.send(error)
      console.log(error)
    } else {
      response.json(success)
    }
  })
}
module.exports.remove = remove

// Update Task
const update = function (request, response, next) {
  let data = request.body

  if (!data) {
    response.status(400).json({ 'error': 'Bad Data' })
  } else {
    Task.findByIdAndUpdate(request.params.id, data, function (error, success) {
      if (error) {
        response.send(error)
        console.log(error)
      } else {
        response.json(success)
      }
    })
  }
}
module.exports.update = update
