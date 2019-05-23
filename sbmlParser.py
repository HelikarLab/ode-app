import sys
from libsbml import *

path = "../uploads/" + sys.argv[1]
reader = SBMLReader()
document = reader.readSBML(path)
print("Number of Errors: ", document.getNumErrors())
print("Level: ", document.getLevel())
print("Version: ", document.getVersion())
