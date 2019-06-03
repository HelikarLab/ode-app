const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('reactions', {
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
  reversible: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    field: 'reversible'
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
  tableName: 'reactions'
})
