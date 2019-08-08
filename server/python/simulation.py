import stimator
import sys
import json
import random
import numpy as np

# Global variables
reactionNo = 0

# Utitlity function to convert a number to decimal with 2 points precision
def dec2(num):
    return "{0:.2f}".format(num)


# Hill Kinetics
def hillEquation(reaction, reactionStrings):
    global reactionNo
    tempReaction = (
        "r"
        + str(reactionNo)
        + ": "
        + str(reaction["reactants"][0]["id"])
        + " -> "
        + str(reaction["products"][0]["id"])
    )
    tempRate = (
        "("
        + str(reaction["parameters"][0])
        + " * "
        + str(reaction["reactants"][0]["id"])
        + "**"
        + str(reaction["parameters"][2])
        + ") / ("
        + str(reaction["parameters"][1])
        + "**"
        + str(reaction["parameters"][2])
        + " + "
        + str(reaction["reactants"][0]["id"])
        + "**"
        + str(reaction["parameters"][2])
        + ")"
    )
    reactionStrings.append(tempReaction + ", rate = " + tempRate)
    reactionNo += 1


# Custom Rate
def customRate(reaction, reactionStrings):
    global reactionNo
    temp = "r" + str(reactionNo) + ": "
    j = 0
    for reactant in reaction["reactants"]:
        if j == len(reaction["reactants"]) - 1:
            temp = temp + str(reactant["stoichiometry"]) + str(reactant["id"])
        else:
            temp = temp + str(reactant["stoichiometry"]) + str(reactant["id"]) + " + "
        j += 1
    temp = temp + " -> "
    k = 0
    for product in reaction["products"]:
        if k == len(reaction["products"]) - 1:
            temp = temp + str(product["stoichiometry"]) + str(product["id"])
        else:
            temp = temp + str(product["stoichiometry"]) + str(product["id"]) + " + "
        k += 1
    temp = temp + ", rate = " + reaction["rate"]
    reactionStrings.append(temp)
    reactionNo += 1


# Michaelis-menten Ratelaw
def michaelisMenten(reaction, reactionsStrings, rateStrings):
    global reactionNo
    if reaction["reversible"]:
        rateStrings.append(
            "k" + str(reactionNo) + " = " + str(reaction["parameters"][0])
        )
        rateStrings.append(
            "k" + str(reactionNo + 1) + " = " + str(reaction["parameters"][1])
        )
        rateStrings.append(
            "k" + str(reactionNo + 2) + " = " + str(reaction["parameters"][2])
        )
        rateStrings.append(
            "k" + str(reactionNo + 3) + " = " + str(reaction["parameters"][3])
        )
        tempReaction = (
            "r"
            + str(reactionNo)
            + ": "
            + str(reaction["reactants"][0]["id"])
            + " -> "
            + str(reaction["products"][0]["id"])
        )
        tempRate = (
            "(k"
            + str(reactionNo)
            + "*"
            + str(reaction["reactants"][0]["id"])
            + " / k"
            + str(reactionNo + 2)
            + " - k"
            + str(reactionNo + 1)
            + "*"
            + str(reaction["products"][0]["id"])
            + " / k"
            + str(reactionNo + 3)
            + ")"
            + " / "
            + "(1 + ("
            + str(reaction["reactants"][0]["id"])
            + " / "
            + "k"
            + str(reactionNo + 2)
            + ") + ("
            + str(reaction["products"][0]["id"])
            + " / "
            + "k"
            + str(reactionNo + 3)
            + "))"
        )
        reactionStrings.append(tempReaction + ", rate = " + tempRate)
        reactionNo += 4
    else:
        rateStrings.append(
            "k" + str(reactionNo) + " = " + str(reaction["parameters"][0])
        )
        rateStrings.append(
            "k" + str(reactionNo + 1) + " = " + str(reaction["parameters"][1])
        )
        tempReaction = (
            "r"
            + str(reactionNo)
            + ": "
            + str(reaction["reactants"][0]["id"])
            + " -> "
            + str(reaction["products"][0]["id"])
        )
        tempRate = (
            "(k"
            + str(reactionNo)
            + " * "
            + str(reaction["reactants"][0]["id"])
            + ") / "
            + "(k"
            + str(reactionNo + 1)
            + " + "
            + str(reaction["reactants"][0]["id"])
            + ")"
        )
        reactionStrings.append(tempReaction + ", rate = " + tempRate)
        reactionNo += 2


# Mass Action Ratelaw
def massAction(reaction, reactionStrings, rateStrings):
    global reactionNo
    if reaction["reversible"]:
        rateStrings.append(
            "k" + str(reactionNo) + " = " + str(reaction["parameters"][0])
        )
        temp = "r" + str(reactionNo) + ": "
        j = 0
        rate = "k" + str(reactionNo) + " * "
        for reactant in reactions[i]["reactants"]:
            if j == len(reactions[i]["reactants"]) - 1:
                temp = temp + str(reactant["stoichiometry"]) + str(reactant["id"])
                rate = rate + str(reactant["id"])
            else:
                temp = (
                    temp + str(reactant["stoichiometry"]) + str(reactant["id"]) + " + "
                )
                rate = rate + str(reactant["id"]) + " * "
            j += 1
        temp = temp + "-> "
        k = 0
        for product in reactions[i]["products"]:
            if k == len(reactions[i]["products"]) - 1:
                temp = temp + str(product["stoichiometry"]) + str(product["id"])
            else:
                temp = temp + str(product["stoichiometry"]) + str(product["id"]) + " + "
            k += 1
        temp = temp + ", rate = " + str(rate)
        reactionStrings.append(temp)
        reactionNo += 1
        rateStrings.append(
            "k" + str(reactionNo) + " = " + str(reaction["parameters"][1])
        )
        temp = "r" + str(reactionNo) + ": "
        rate = "k" + str(reactionNo) + " * "
        k = 0
        for product in reactions[i]["products"]:
            if k == len(reactions[i]["products"]) - 1:
                temp = temp + str(product["stoichiometry"]) + str(product["id"])
                rate = rate + str(product["id"])
            else:
                temp = temp + str(product["stoichiometry"]) + str(product["id"]) + " + "
                rate = rate + str(product["id"]) + " * "
            k += 1
        temp = temp + "-> "
        j = 0
        for reactant in reactions[i]["reactants"]:
            if j == len(reactions[i]["reactants"]) - 1:
                temp = temp + str(reactant["stoichiometry"]) + str(reactant["id"])
            else:
                temp = (
                    temp + str(reactant["stoichiometry"]) + str(reactant["id"]) + " + "
                )
            j += 1
        temp = temp + ", rate = " + str(rate)
        reactionStrings.append(temp)
        reactionNo += 1
    else:
        rateStrings.append(
            "k" + str(reactionNo) + " = " + str(reaction["parameters"][0])
        )
        temp = "r" + str(reactionNo) + ": "
        j = 0
        rate = "k" + str(reactionNo) + " * "
        for reactant in reactions[i]["reactants"]:
            if j == len(reactions[i]["reactants"]) - 1:
                temp = temp + str(reactant["stoichiometry"]) + str(reactant["id"])
                rate = rate + str(reactant["id"])
            else:
                temp = (
                    temp + str(reactant["stoichiometry"]) + str(reactant["id"]) + " + "
                )
                rate = rate + str(reactant["id"]) + " * "
            j += 1
        temp = temp + "-> "
        k = 0
        for product in reactions[i]["products"]:
            if k == len(reactions[i]["products"]) - 1:
                temp = temp + str(product["stoichiometry"]) + str(product["id"])
            else:
                temp = temp + str(product["stoichiometry"]) + str(product["id"]) + " + "
            k += 1
        temp = temp + ", rate = " + str(rate)
        reactionStrings.append(temp)
        reactionNo += 1


data = json.loads(sys.argv[1])

metabolites = data["metabolites"]
reactions = data["reactions"]
time = data["time"]
dataPoints = data["dataPoints"]

reactionStrings = []
rateStrings = []
for i in range(len(reactions)):
    if reactions[i]["checked"]:
        if reactions[i]["ratelaw"] == "mass-action":
            massAction(reactions[i], reactionStrings, rateStrings)
        elif reactions[i]["ratelaw"] == "michaelis-menten":
            michaelisMenten(reactions[i], reactionStrings, rateStrings)
        elif reactions[i]["ratelaw"] == "custom-rate":
            customRate(reactions[i], reactionStrings)
        elif reactions[i]["ratelaw"] == "hill-equation":
            hillEquation(reactions[i], reactionStrings)

init = """init: ("""

for i in range(len(metabolites)):
    if i == len(metabolites) - 1:
        temp = (
            str(metabolites[i]["id"])
            + " = "
            + str(metabolites[i]["initialConcentration"])
            + ")"
        )
    else:
        temp = (
            str(metabolites[i]["id"])
            + " = "
            + str(metabolites[i]["initialConcentration"])
            + ", "
        )
    init = init + temp


model_string = """ 

title test

"""


for item in reactionStrings:
    model_string += (
        item
        + """
    """
    )

for item in rateStrings:
    model_string += (
        item
        + """
    """
    )

model_string += (
    init
    + """
"""
)

m = stimator.read_model(model_string)

concentrationData = []
for var in m.varnames:
    concentrationData.append({"name": var})

a = m.solve(tf=time, npoints=dataPoints)
for i in range(len(a)):
    concentrationData[i]["data"] = a[i].tolist()

for item in concentrationData:
    item["data"] = list(map(dec2, item["data"]))

finalData = {"concentrationData": concentrationData}

print(json.dumps(finalData))
sys.stdout.flush()
