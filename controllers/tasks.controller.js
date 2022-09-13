/*** Models */
const { User } = require('../models/user.model')
const { Task } =require('../models/tasks.model')

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "title", "limitDate", "startDate", "createdAt"],
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getTaskByStatus = async (req, res) => {
  try {
    const { statusParams } = req.params;
    const taskStatus = await Task.findAll({
      where: { status: statusParams },
    });

    //
    if (!taskStatus) {
      return res.status(404).json({
        status: "error",
        message: "Status not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { taskStatus },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const createTask = async (req, res) => {
  try {
    const { title, limitDate, startDate, userId } = req.body;
    const newTask = await Task.create({ title, limitDate, startDate, userId });

    res.status(201).json({
      status: "success",
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateTask = async (req, res) => {
  try {
    const { task } = req;
    const { finishDate } = req.body;

    //
    if (task.status === "active") {
      const updateTheTask = await task.update({ finishDate });
      const limitDateTask = Date.parse(task.limitDate);
      const finishDateTask = Date.parse(finishDate);

      //
      if (limitDateTask >= finishDateTask) {
        updateTheTask.update({ status: "completed" });
      } else {
        updateTheTask.update({ status: "late" });
      }
      //
      res.status(200).json({
        status: "success",
        data: { updateTheTask },
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "The task was previously completed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const deleteTask = async (req, res) => {
  try {
    const { task } = req;
    await task.update({ status: "cancelled" });

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

/** exports */
module.exports = {
  getAllTasks,
  getTaskByStatus,
  createTask,
  updateTask,
  deleteTask,
};