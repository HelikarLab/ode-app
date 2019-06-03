const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('parameters', {
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
  value: {
    type: Sequelize.BIGINT,
    allowNull: false,
    field: 'value'
  },
  constant: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    field: 'constant'
  },
  modelId: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: 'model',
      key: 'id'
    },
    field: 'model_id'
  }
}, {
  tableName: 'parameters'
})
