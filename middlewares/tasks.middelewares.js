/** Models */
const { Task } = require('../models/tasks.model')

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const taskExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id } });
    //
    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    req.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

/** exports */
module.exports = { taskExists };