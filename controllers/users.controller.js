/*** Models */
const { User } = require('../models/user.model')
const { Task } = require('../models/tasks.model')

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: "active" },
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Task,
          attributes: [
            "id",
            "title",
            "startDate",
            "limitDate",
            "createdAt",
            "status",
          ],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: {
        users,
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
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      status: "success",
      data: { newUser },
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
const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    // Update using a model's instance
    await user.update({ name, email });

    res.status(200).json({
      status: "success",
      data: { user },
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
const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    // Soft delete
    await user.update({ status: "disabled" });

    res.status(204).json({ status: "success", data: { user } });
  } catch (error) {
    console.log(error);
  }
};

/*** exports */
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};