const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('model', {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    field: 'id'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'name'
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'description'
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'name'
  }
}, {
  tableName: 'model'
})
