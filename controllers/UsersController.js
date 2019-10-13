const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/users')

/**
 * Get All Users
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const getAll = (request, response) => {
  Users.find({}, (error, success) => {
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
 * Get Single Users
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const getSingle = (request, response) => {
  Users.findOne({ 'username': request.params.username }, (error, success) => {
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
 * Save Users
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
// const create = (request, response) => {
//   let data = request.body

//   if (!data.username || !data.password) {
//     response.status(400).json({ 'error': 'Bad Data' })
//   } else {
//     let todo = new Users(data)
//     todo.save((error, success) => {
//       if (error) {
//         response.send(error)
//         console.log(error)
//       } else {
//         response.json(success)
//       }
//     })
//   }
// }
// module.exports.create = create

/**
 * Register Users
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const register = (request, response, next) => {
  let user = request.body

  if (user.username !== '' && user.password !== '') {
    Users.findOne({ 'username': user.username }, function (error, requestedUser) {
      if (error) {
        response.send(error)
        console.log(error)
      } else {
        if (requestedUser) {
          response.status(400)
          response.json({ 'error': 'username already exist' })
        } else {
          let entryUser = user

          entryUser.password = bcrypt.hashSync(user.password, 10)

          let newUser = new Users(entryUser)

          newUser.save(function (err, insertedUser) {
            if (err) {
              response.send(err)
              console.log(err)
            } else {
              response.json(insertedUser)
            }
          })
        }
      }
    })
  } else {
    response.status(400)
    response.json({ 'error': 'username or password cannot be empty' })
  }
}
module.exports.register = register

/**
 * Login Users
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const login = (request, response, next) => {
  let user = request.body

  if (user.username !== '' && user.password !== '') {
    Users.findOne({ 'username': user.username }, function (error, requestedUser) {
      if (error) {
        response.send(error)
        console.log(error)
      } else {
        if (requestedUser) {
          if (bcrypt.compareSync(user.password, requestedUser.password)) {
            response.json({
              username: requestedUser.username,
              token: jwt.sign({ sub: requestedUser._id }, 'qwerasdfzxcv')
            })
          } else {
            response.status(400)
            response.json({ 'error': 'password incorrect' })
          }
        } else {
          response.status(404)
          response.json({ 'error': 'user not found' })
        }
      }
    })
  } else {
    response.status(400)
    response.json({ 'error': 'username or password cannot be empty' })
  }
}
module.exports.login = login

/**
 * Delete Users
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const remove = (request, response) => {
  Users.findOneAndRemove({ 'username': request.params.username }, (error, success) => {
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
 * Update Users
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const update = (request, response) => {
  let user = request.body

  if (!user) {
    response.status(400)
    response.json({ 'error': 'Bad Data' })
  } else {
    Users.findOne({ 'username': request.params.username }, (error, requestedUser) => {
      if (error) {
        response.send(error)
        console.log(error)
      } else {
        if (requestedUser) {
          if (bcrypt.compareSync(user.password, requestedUser.password)) {
            response.status(400)
            response.json({ 'error': 'Can not update same password' })
          } else {
            Users.findOneAndUpdate({ 'username': request.params.username }, user, (err, success) => {
              if (err) {
                response.send(err)
                console.log(err)
              } else {
                response.json(success)
              }
            })
          }
        } else {
          response.status(400)
          response.json({ 'error': 'user not found' })
        }
      }
    })
  }
}

module.exports.update = update
