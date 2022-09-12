const { User } = require('./user.model')
const { Tasks } = require('./tasks.model')

const initModels = () =>{
    User.hasMany(Tasks, { foreignKey: 'userId' })
    Tasks.belongsTo(User)
}

module.exports = { initModels } 