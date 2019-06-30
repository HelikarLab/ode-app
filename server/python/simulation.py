import stimator
import sys
import json
import random
import numpy as np


def dec2(num):
    return "{0:.2f}".format(num)


data = json.loads(sys.argv[1])

metabolites = data["metabolites"]
reactions = data["reactions"]
time = data["time"]

reactionStrings = []

for i in range(len(reactions)):
    if reactions[i]["checked"]:
        temp = "r" + str(i) + ": "
        j = 0
        for reactant in reactions[i]["reactants"]:
            if j == len(reactions[i]["reactants"]) - 1:
                temp = temp + str(reactant["stoichiometry"]) + str(reactant["id"]) + " "
            else:
                temp = (
                    temp + str(reactant["stoichiometry"]) + str(reactant["id"]) + " + "
                )
            j += 1
        temp = temp + "-> "
        k = 0
        for product in reactions[i]["products"]:
            if k == len(reactions[i]["products"]) - 1:
                temp = temp + str(product["stoichiometry"]) + str(product["id"])
            else:
                temp = temp + str(product["stoichiometry"]) + str(product["id"]) + " + "
            k += 1
        if reactions[i]["reactants"][0]["id"]:
            temp = temp + ", rate = k1 * " + str(reactions[i]["reactants"][0]["id"])
        else:
            temp = temp + ", rate = k1 * " + str(reactions[i]["products"][0]["id"])
        reactionStrings.append(temp)

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

model_string += """ k1 = 0.1 
"""

model_string += (
    init
    + """
"""
)

m = stimator.read_model(model_string)

concentrationData = []
for var in m.varnames:
    concentrationData.append({"name": var})

a = m.solve(tf=time - 1, npoints=time)
for i in range(len(a)):
    concentrationData[i]["data"] = a[i].tolist()

for item in concentrationData:
    item["data"] = list(map(dec2, item["data"]))

finalData = {"concentrationData": concentrationData}

print(json.dumps(finalData))
sys.stdout.flush()
