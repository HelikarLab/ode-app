const shell = require('shelljs')

shell.exec('babel . --out-dir build')
shell.cp('-R', 'python', 'build/python')
shell.cp('.env', 'build/.env')
