const { DataTypes, db } = require('../utils/db.util')

const Tasks = db.define('tasks', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,    
    },
    limitDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    finishDate: {
        type: DataTypes.DATE,
        allowNull: false        
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
        allowNull: false
    }
})

module.exports = { Tasks }