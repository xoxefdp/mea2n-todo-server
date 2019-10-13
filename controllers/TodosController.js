const Todos = require('../models/todos')

/**
 * Get All Todos
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const getAll = (request, response) => {
  Todos.find({}, (error, success) => {
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
 * Get Single Todos
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const getSingle = (request, response) => {
  Todos.findById(request.params.id, (error, success) => {
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
 * Save Todos
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const create = (request, response) => {
  let data = request.body

  console.log(data)

  if (!data.title || !(data.isDone + '')) {
    response.status(400).json({ 'error': 'Bad Data' })
  } else {
    let todo = new Todos(data)
    todo.save((error, success) => {
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
 * Delete Todos
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const remove = (request, response) => {
  Todos.findByIdAndRemove(request.params.id, (error, success) => {
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
 * Update Todos
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const update = (request, response) => {
  let data = request.body

  if (!data) {
    response.status(400).json({ 'error': 'Bad Data' })
  } else {
    Todos.findByIdAndUpdate(request.params.id, data, (error, success) => {
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
