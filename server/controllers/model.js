// const Model = require('../models/model')
import Model from '../models/model'
import Specie from '../models/specie'
import Reaction from '../models/reaction'
import Compartment from '../models/compartment'

/**
 * Controller function to add a model to the database
 */
export function addModel(req, res) {
  const model = req.body
  // Enters the model in the database
  Model.create({
    name: model.name,
    sbmlId: model.id,
    sbmlLevel: model.sbmlLevel,
    sbmlVersion: model.sbmlVersion,
    jsonModel: model,
  })
    .then(data => {
      // Enters all the species of the model in the database
      model.species.map(specie => {
        Specie.create({
          name: specie.name,
          sbmlId: specie.id,
          initialConcentration: String(specie.initialConcentration),
          compartment: specie.compartment,
          modelId: data.id,
        }).catch(error => {
          res.status(500).send('Something went wrong.')
        })
      })
      // Enters all the reactions of the model in the database
      model.reactions.map(reaction => {
        Reaction.create({
          name: reaction.name,
          sbmlId: reaction.id,
          reversible: reaction.reversible,
          reactants: reaction.reactants,
          products: reaction.products,
          compartments: reaction.compartments,
          modelId: data.id,
        }).catch(error => {
          console.log(error)
          res.status(500).send('Something went wrong.')
        })
      })
      // Enters all the compartments of the model in the database
      model.compartments.map(compartment => {
        Compartment.create({
          name: compartment.name,
          sbmlId: compartment.id,
          spatialDimensions: compartment.spatialDimensions,
          size: compartment.size,
          modelId: data.id,
        }).catch(error => {
          res.status(500).send('Something went wrong.')
        })
      })
    })
    .then(() => {
      res.status(200).send('Successfully saved model.')
    })
    .catch(error => {
      res.status(500).send('Something went wrong.')
    })
}

/**
 * Controller function to fetch a model by id from the database
 */
export function getModel(req, res) {
  Model.findByPk(req.params.id)
    .then(model => {
      res.status(200).send(model)
    })
    .catch(err => res.status(500).send('Something went wrong.'))
}

/**
 * Controller function to fetch all models in the database
 */
export function getAllModels(req, res) {
  Model.findAll({ attributes: ['id', 'name', 'createdAt'] })
    .then(models => res.status(200).send(models))
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong.')
    })
}
