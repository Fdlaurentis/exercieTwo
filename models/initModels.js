/** Models */
const { User } = require('./user.model')
const { Task } = require('./tasks.model')

/**
 *  initModels
 */
const initModels = () => {
  // 1 User <----> M Task
  User.hasMany(Task, { foreignKey: "userId" });
  Task.belongsTo(User);
};

/** exports */
module.exports = { initModels };