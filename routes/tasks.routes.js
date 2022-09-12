const express = require('express')

const tasksRouter = express.Router()

tasksRouter.get('/', getAlltaskss)

module.exports = { tasksRouter }