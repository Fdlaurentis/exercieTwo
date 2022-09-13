const express = require('express');

/** Controllers */
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

/** Middlewares */
const { userExists } = require('../middlewares/users.middlewares');

/** validators */
const {
  createUserValidators,
  updateUserValidators,
} = require('../middlewares/validators.middlewaares');

/** Router */
const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUserValidators, createUser);

usersRouter.patch('/:id', userExists, updateUserValidators, updateUser);

usersRouter.delete('/:id', userExists, deleteUser);

/** exports */
module.exports = { usersRouter };