import sys
import json
import libsbml

path = "uploads/" + sys.argv[1]
reader = libsbml.SBMLReader()
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

    tempObject["reactionString"] = reactionString
    reactions.append(tempObject)

data = {
    "id": model.getId(),
    "name": model.getName(),
    "sbmlLevel": model.getLevel(),
    "sbmlVersion": model.getVersion(),
    "metabolites": metabolites,
    "reactions": reactions,
}

print(json.dumps(data))

sys.stdout.flush()

