const Task = require('../models/tasks')

/**
 * Get All Tasks
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const getAll = (request, response) => {
  Task.find({}, (error, success) => {
    if (error) {
      response.send(error)
      console.log(error)
    } else {
      response.json(success)
    }
  })
}
module.exports.getAll = getAll

/**
 * Get Single Task
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const getSingle = (request, response) => {
  Task.findById(request.params.id, (error, success) => {
    if (error) {
      response.send(error)
      console.log(error)
    } else {
      response.json(success)
    }
  })
}
module.exports.getSingle = getSingle

/**
 * Save Task
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const create = (request, response) => {
  let data = request.body

  if (!data.title || !(data.isDone + '')) {
    response.status(400).json({ 'error': 'Bad Data' })
  } else {
    let task = new Task(data)
    task.save((error, success) => {
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

/**
 * Delete Task
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const remove = (request, response) => {
  Task.findByIdAndRemove(request.params.id, (error, success) => {
    if (error) {
      response.send(error)
      console.log(error)
    } else {
      response.json(success)
    }
  })
}
module.exports.remove = remove

/**
 * Update Task
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const update = (request, response) => {
  let data = request.body

  if (!data) {
    response.status(400).json({ 'error': 'Bad Data' })
  } else {
    Task.findByIdAndUpdate(request.params.id, data, (error, success) => {
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
