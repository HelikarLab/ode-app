const shell = require('shelljs')

shell.exec('babel . --out-dir build --ignore scripts/*')
shell.cp('-R', 'python', 'build/python')
