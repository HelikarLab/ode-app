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
        # return reactionNo
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
        # return reactionNo


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
