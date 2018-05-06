let express = require('express');

// controller
let TaskController = require('../controllers/TaskController');

// routes
let router = express.Router();
router.get('/tasks', TaskController.getAll);
router.get('/task/:id', TaskController.getSingle);
router.post('/task', TaskController.create);
router.delete('/task/:id', TaskController.remove);
router.put('/task/:id', TaskController.update);

module.exports = router;
