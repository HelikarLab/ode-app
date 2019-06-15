const fs = require('fs')
const Model = require('../models/model')
const Metabolite = require('../models/metabolite')
const Reaction = require('../models/reaction')
const SbmlFile = require('../models/sbmlFile')

module.exports = function(req, res) {
  const file = req.files.file
  const model = JSON.parse(req.fields.model)
  Model.create({
    name: model.name,
    sbmlId: model.id,
    sbmlLevel: model.sbmlLevel,
    sbmlVersion: model.sbmlVersion,
    jsonModel: model,
  }).then(data => {
    model.metabolites.map(metabolite => {
      Metabolite.create({
        name: metabolite.name,
        sbmlId: metabolite.id,
        charge: metabolite.charge,
        initialConcentration: metabolite.initialConcentration,
        modelId: data.id,
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
      })
    })
    SbmlFile.create({
      fileBytes: file,
      modelId: data.id,
    }).then(() => {
      fs.unlinkSync(file.path)
    })
  })

  res.status(200).send('It worked I guess.')
}
