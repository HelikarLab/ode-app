# import sys
# import json
# import random
# import modelbase
# import modelbase.ratelaws as rl
# import numpy as np

# data = json.loads(sys.argv[1])

# metabolites = data["metabolites"]

# cl = []
# icArr = []
# for metabolite in metabolites:
#     cl.push(metabolite["id"])
#     icArr.push(metabolite["initialConcentration"])

# p = {"k": 0.5}


# m = modelbase.Model(p)
# m.set_cpds(cl)

# for i in range(len(data["reactions"])):
#     m.add_reaction("v" + i, trialRate, {}

# def v1(p,x):
#     return p.k1*x
# m.set_rate('v1',v1,'X')

# def v2(p,y):
#     return p.k2*y
# m.set_rate('v2',v2,'Y')

# m.set_stoichiometry('v0',{'X':1})
# m.set_stoichiometry('v1',{'X':-1,'Y':1})
# m.set_stoichiometry('v2',{'Y':-1})

# print(m.stoichiometries)

# s = modelbase.Simulator(m)

# time = np.linspace(0,100,1000)

# s.timeCourse(time, [0, 0]);

# print (s.getT(), s.getY())

