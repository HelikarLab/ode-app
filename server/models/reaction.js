const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define(
  'reaction',
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
    reversible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      field: 'reversible',
    },
    reactants: {
      type: Sequelize.ARRAY(Sequelize.JSONB),
      allowNull: false,
      field: 'reactants',
    },
    products: {
      type: Sequelize.ARRAY(Sequelize.JSONB),
      allowNull: false,
      field: 'products',
    },
    modifiers: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      field: 'modifiers',
    },
    compartments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      field: 'compartments',
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
    tableName: 'reactions',
  }
)
