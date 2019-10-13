const express = require('express')
const router = express.Router()

/**
 * CONTROLLERS
 */
const TodosController = require('../controllers/TodosController')
const UsersController = require('../controllers/UsersController')

/**
 * API entry point
 */
router.get('/api', function (req, res, next) {
  res.statusCode = 200
  res.json({ status: 'success', message: 'Parcel Pending API', data: { 'version_number': 'v1.0.0' } })
})

/**
 * API Routes
 */

// tasks
router.get('/api/tasks/:id', TodosController.getSingle)
router.get('/api/tasks', TodosController.getAll)
router.post('/api/tasks', TodosController.create)
router.delete('/api/tasks/:id', TodosController.remove)
router.put('/api/tasks/:id', TodosController.update)

// users
router.get('/api/users/:username', UsersController.getSingle)
router.get('/api/users', UsersController.getAll)
router.post('/api/users/register', UsersController.register)
router.post('/api/users/login', UsersController.login)
router.delete('/api/users/:username', UsersController.remove)
router.put('/api/users/:username', UsersController.update)

module.exports = router
