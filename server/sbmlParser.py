import sys
import json
from libsbml import *

path = "uploads/" + sys.argv[1]
reader = SBMLReader()
document = reader.readSBML(path)
model = document.getModel()

listOfSpecies = model.getListOfSpecies()
listOfReactions = model.getListOfReactions()

metabolites = []

for specie in listOfSpecies:
    metabolites.append(
        {
            "id": specie.getId(),
            "name": specie.getName(),
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
        "reactants": [],
        "products": [],
        "reactionString": "",
    }
    listOfProducts = reaction.getListOfProducts()
    listOfReactants = reaction.getListOfReactants()
    for reactant in listOfReactants:
        tempObject["reactants"].append(reactant.getSpecies())
    for product in listOfProducts:
        tempObject["products"].append(product.getSpecies())
    # Formulating the reaction string
    reactionString = ""
    for i in range(len(tempObject["reactants"])):
        if i == (len(tempObject["reactants"]) - 1):
            reactionString = reactionString + tempObject["reactants"][i] + " "
        else:
            reactionString = reactionString + tempObject["reactants"][i] + " + "
    if tempObject["reversible"]:
        reactionString = reactionString + "<==> "
    else:
        reactionString = reactionString + "==> "
    for i in range(len(tempObject["products"])):
        if i == (len(tempObject["products"]) - 1):
            reactionString = reactionString + tempObject["products"][i]
        else:
            reactionString = reactionString + tempObject["products"][i] + " + "
    tempObject["reactionString"] = reactionString
    reactions.append(tempObject)

reactionString = ""


data = {
    "model": {
        "id": model.getId(),
        "name": model.getName(),
        "sbmlLevel": model.getLevel(),
        "sbmlVersion": model.getVersion(),
        "metabolites": metabolites,
        "reactions": reactions,
    }
}

print(json.dumps(data))

sys.stdout.flush()
