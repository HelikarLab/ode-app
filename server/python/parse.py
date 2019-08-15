import sys
import json
import libsbml
from pydash.collections import includes
from pydash.arrays import concat

path = "uploads/" + sys.argv[1]
reader = libsbml.SBMLReader()
document = reader.readSBML(path)
model = document.getModel()

listOfSpecies = model.getListOfSpecies()
listOfReactions = model.getListOfReactions()
listOfCompartments = model.getListOfCompartments()


def generateCompartments(reaction, species):
    compartments = []
    allReactionSpecies = concat(reaction["reactants"], reaction["products"])
    for reactionSpecie in allReactionSpecies:
        for specie in species:
            if reactionSpecie["id"] == specie["id"]:
                if not includes(compartments, specie["compartment"]):
                    compartments.append(specie["compartment"])
    return compartments


compartments = []

for compartment in listOfCompartments:
    compartments.append(
        {
            "id": compartment.getId(),
            "name": compartment.getName(),
            "spatialDimensions": compartment.getSpatialDimensions(),
            "size": compartment.getSize(),
        }
    )

species = []

for specie in listOfSpecies:
    species.append(
        {
            "id": specie.getId(),
            "name": specie.getName(),
            "initialConcentration": specie.getInitialConcentration(),
            "compartment": specie.getCompartment(),
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
        "modifiers": [],
        "reactionString": "",
    }
    listOfModifiers = reaction.getListOfModifiers()
    listOfProducts = reaction.getListOfProducts()
    listOfReactants = reaction.getListOfReactants()
    for modifier in listOfModifiers:
        tempObject["modifiers"].append(modifier.getSpecies())
    for reactant in listOfReactants:
        tempObject["reactants"].append(
            {"id": reactant.getSpecies(), "stoichiometry": reactant.getStoichiometry()}
        )
    for product in listOfProducts:
        tempObject["products"].append(
            {"id": product.getSpecies(), "stoichiometry": product.getStoichiometry()}
        )
    # Formulating the reaction string
    reactionString = ""
    i = 0
    for reactant in tempObject["reactants"]:
        if i == (len(tempObject["reactants"]) - 1):
            reactionString = (
                reactionString + str(reactant["stoichiometry"]) + reactant["id"] + " "
            )
        else:
            reactionString = (
                reactionString + str(reactant["stoichiometry"]) + reactant["id"] + " + "
            )
        i += 1

    if tempObject["reversible"]:
        reactionString = reactionString + "<==> "
    else:
        reactionString = reactionString + "==> "

    i = 0
    for product in tempObject["products"]:
        if i == (len(tempObject["products"]) - 1):
            reactionString = (
                reactionString + str(product["stoichiometry"]) + product["id"] + " "
            )
        else:
            reactionString = (
                reactionString + str(product["stoichiometry"]) + product["id"] + " + "
            )
        i += 1

    tempObject["compartments"] = generateCompartments(tempObject, species)
    tempObject["reactionString"] = reactionString
    reactions.append(tempObject)

data = {
    "id": model.getId(),
    "name": model.getName(),
    "sbmlLevel": model.getLevel(),
    "sbmlVersion": model.getVersion(),
    "species": species,
    "reactions": reactions,
    "compartments": compartments,
}

print(json.dumps(data))

sys.stdout.flush()
