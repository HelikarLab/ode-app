const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('species', {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    field: 'id'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'name'
  },
  quantityType: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'quantityType'
  },
  initialQuantity: {
    type: Sequelize.BIGINT,
    allowNull: false,
    field: 'initialQuantity'
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
  tableName: 'species'
})
