import { PythonShell } from 'python-shell'
import fs from 'fs'

/**
 * Controller function to a receive a sbml file and return the JSON of a model
 */
const uploadSbmlController = function(req, res) {
  const file = req.files.file

  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads')
  }

  fs.renameSync(file.path, `./uploads/${file.name}`)

  const options = {
    args: [file.name],
    scriptPath: './python/',
  }

  PythonShell.run('parse.py', options, function(err, data) {
    if (err) {
      console.error(err)
      res.status(500).send('Something went wrong.')
    } else {
      fs.unlinkSync('./uploads/' + file.name)
      res.status(200).send(data)
    }
  })
}

export default uploadSbmlController
