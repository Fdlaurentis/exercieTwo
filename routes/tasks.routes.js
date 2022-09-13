const express = require('express');

/** Controllers */
const {
  getAllTasks,
  getTaskByStatus,
  createTask,
  deleteTask,
  updateTask,
} = require('../controllers/tasks.controller');

/** Middlewares */
const { taskExists } = require('../middlewares/tasks.middelewares');

/** validators */
const {
  createTaskValidators,
} = require('../middlewares/validators.middlewaares');

/** Router  */
const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);

tasksRouter.get('/:statusParams', getTaskByStatus);

tasksRouter.post('/', createTaskValidators, createTask);

tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

/** exports */
module.exports = { tasksRouter };