import Sequelize from 'sequelize'
import db from '../config/database'
const Model = db.define(
  'model',
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
    sbmlLevel: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'sbml_level',
    },
    sbmlVersion: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'sbml_version',
    },
    jsonModel: {
      type: Sequelize.JSONB,
      allowNull: false,
      field: 'json_model',
    },
  },
  {
    tableName: 'models',
  }
)

export default Model
