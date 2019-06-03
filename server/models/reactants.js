const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define('reactants', {
  speciesId: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: 'species',
      key: 'id'
    },
    field: 'species_id'
  },
  reactionId: {
    type: Sequelize.BIGINT,
    allowNull: false,
    references: {
      model: 'reactions',
      key: 'id'
    },
    field: 'reaction_id'
  }
}, {
  tableName: 'reactants'
})
