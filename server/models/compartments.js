const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('compartments', {
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
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'type'
  },
  spatialDimensions: {
    type: Sequelize.BIGINT,
    allowNull: false,
    field: 'spatialDimensions'
  },
  size: {
    type: Sequelize.BIGINT,
    allowNull: false,
    field: 'size'
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
  tableName: 'compartments'
})
