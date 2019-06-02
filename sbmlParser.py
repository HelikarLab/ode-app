import sys
import json
from libsbml import *

path = "uploads/" + sys.argv[1]
reader = SBMLReader()
document = reader.readSBML(path)
model = document.getModel()

listOfSpecies = model.getListOfSpecies()
listOfReactions = model.getListOfReactions()

species = []

for specie in listOfSpecies:
    species.append(
        {
            "id": specie.getId(),
            "name": specie.getName(),
            "compartment": specie.getCompartment(),
            "charge": specie.getCharge(),
            "initialConcentration": specie.getInitialConcentration(),
        }
    )

reactions = []

for reaction in listOfReactions:
    tempObject = {
        "id": reaction.getId(),
        "name": reaction.getName(),
        "reversible": reaction.getReversible(),
        "products": [],
        "reactants": [],
        "kineticLaw": {"parameters": []},
    }
    listOfProducts = reaction.getListOfProducts()
    for product in listOfProducts:
        tempObject["products"].append(product.getSpecies())
    listOfReactants = reaction.getListOfReactants()
    for reactant in listOfReactants:
        tempObject["reactants"].append(reactant.getSpecies())
    listOfParameters = reaction.getKineticLaw().getListOfParameters()
    for parameter in listOfParameters:
        tempObject["kineticLaw"]["parameters"].append(
            {
                "name": parameter.getName(),
                "id": parameter.getId(),
                "value": parameter.getValue(),
            }
        )
    reactions.append(tempObject)

data = {
    "model": {
        "id": model.getId(),
        "name": model.getName(),
        "sbmlLevel": model.getLevel(),
        "sbmlVersion": model.getVersion(),
        "species": species,
        "reactions": reactions,
    }
}

print(json.dumps(data))

sys.stdout.flush()
