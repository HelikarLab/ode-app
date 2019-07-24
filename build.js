const shell = require('shelljs')

shell.exec('cd client && yarn build')
shell.rm('-rf', './server/public')
shell.cp('-R', './client/build', './server/public')
