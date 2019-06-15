const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define(
  'metabolite',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'name',
    },
    sbmlId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'sbml_id',
    },
    charge: {
      type: Sequelize.BIGINT,
      allowNull: false,
      field: 'charge',
    },
    initialConcentration: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'initial_concentration',
    },
    modelId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'models',
        key: 'id',
      },
      field: 'model_id',
    },
  },
  {
    tableName: 'metabolites',
  }
)
