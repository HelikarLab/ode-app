import db from '../config/database'
import Sequelize from 'sequelize'

const Compartment = db.define(
  'compartment',
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
    spatialDimensions: {
      type: Sequelize.BIGINT,
      allowNull: false,
      field: 'spatial_dimensions',
    },
    size: {
      type: Sequelize.BIGINT,
      allowNull: false,
      field: 'size',
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
    tableName: 'compartments',
  }
)

export default Compartment
