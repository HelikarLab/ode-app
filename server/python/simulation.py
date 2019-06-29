import stimator
import sys
import json
import random

data = json.loads(sys.argv[1])

print(data)

# metabolites = data["metabolites"]
# reactions = data["reactions"]

# reactionStrings = []

# for i in range(len(reactions)):
#     temp = "r" + str(i) + ": "
#     for reactant in reactions[i]["reactants"]:
#         temp = temp + reactant["stoichiometry"] + reactant["id"] + " "

#     temp = temp + "-> "

#     for product in reactions[i]["products"]:
#         temp = temp + product["stoichiometry"] + product["id"] + " "

#     reactionStrings.push(temp)

# print(reactionStrings)

# init = """init: ("""

# for i in range(len(metabolites)):
#     if i == len(metabolites) - 1:
#         temp = (
#             str(metabolites[i]["id"])
#             + " = "
#             + str(metabolites[i]["initialConcentration"])
#             + ")"
#         )
#     else:
#         temp = (
#             str(metabolites[i]["id"])
#             + " = "
#             + str(metabolites[i]["initialConcentration"])
#             + ", "
#         )
#     init = init + temp

# print(init)

# model_description = """

# title A two-reaction chemical system

# r1: 2.5A -> B, rate = k1 * A
# r2: B -> C, rate = k2 * B - k3 * C

# k1 = 0.1
# k2 = 2
# k3 = 1

# init: (A = 1, B = 0, C = 2)

# """

# m = stimator.read_model(model_description)

# print(m)

# a = m.solve(tf=10, outputs=["A", "B", "C"])
# print(a)
# print(a[0], a[1], a[2])

