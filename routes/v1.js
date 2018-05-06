const express = require('express');
const router = express.Router();

/**
 * CONTROLLERS
 */
const TaskController = require('../controllers/TaskController');

/**
 * API entry point
 */
router.get('/api', function (req, res, next) {
    res.statusCode = 200;
    res.json({ status: "success", message: "Parcel Pending API", data: { "version_number": "v1.0.0" } })
});

/**
 * API Routes
 */
router.get(     '/api/task/:id',    TaskController.getSingle);
router.get(     '/api/tasks',       TaskController.getAll);
router.post(    '/api/task',        TaskController.create);
router.delete(  '/api/task/:id',    TaskController.remove);
router.put(     '/api/task/:id',    TaskController.update);

module.exports = router;
