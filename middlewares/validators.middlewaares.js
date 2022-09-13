const { body, validationResult } = require("express-validator");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  //
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    const message = errorMessages.join(". ");

    return res.status(400).json({
      status: "error",
      message,
    });
  }
  next();
};

/**
 * create User Validators
 */
const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Please, Name must be a string")
    .notEmpty()
    .withMessage("Please, Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("please enter a valid email"),
  body("password")
    .isString()
    .withMessage("Please, Password must be a string")
    .notEmpty()
    .withMessage("Please, Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Please, Your password must be at least 8 characters"),
  checkValidations,
];

/**
 * create Task Validators
 */
const createTaskValidators = [
  body("title")
    .isString()
    .withMessage("Please, title must be a string")
    .isLength({ min: 3 })
    .withMessage("Sorry, title must be at least 3 characters"),
  checkValidations,
];

/**
 * update User Validators
 */
const updateUserValidators = [
  body("name")
    .isString()
    .withMessage("Please, Name must be a string")
    .notEmpty()
    .withMessage("Please, Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("please enter a valid email"),
  checkValidations,
];

/** exports */
module.exports = {
  createUserValidators,
  createTaskValidators,
  updateUserValidators,
};