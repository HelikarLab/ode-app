const Model = require('../models/model')
const Metabolite = require('../models/metabolite')
const Reaction = require('../models/reaction')

exports.addModel = function(req, res) {
  const model = req.body
  Model.create({
    name: model.name,
    sbmlId: model.id,
    sbmlLevel: model.sbmlLevel,
    sbmlVersion: model.sbmlVersion,
    jsonModel: model,
  })
    .then(data => {
      model.metabolites.map(metabolite => {
        Metabolite.create({
          name: metabolite.name,
          sbmlId: metabolite.id,
          charge: metabolite.charge,
          initialConcentration: metabolite.initialConcentration,
          modelId: data.id,
        }).catch(error => {
          res.status(500).send('Something went wrong.')
        })
      })
      model.reactions.map(reaction => {
        Reaction.create({
          name: reaction.name,
          sbmlId: reaction.id,
          reversible: reaction.reversible,
          reactants: reaction.reactants,
          products: reaction.products,
          modelId: data.id,
        }).catch(error => {
          res.status(500).send('Something went wrong.')
        })
      })
    })
    .catch(error => {
      res.status(500).send('Something went wrong.')
    })

  res.status(200).send('Successfully saved model.')
}

exports.getModel = function(req, res) {
  Model.findByPk(req.params.id)
    .then(model => {
      res.status(200).send(model)
    })
    .catch(err => res.status(500).send('Something went wrong.'))
}

exports.getAllModels = function(req, res) {
  Model.findAll({ attributes: ['id', 'name', 'createdAt'] })
    .then(models => res.status(200).send(models))
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong.')
    })
}
