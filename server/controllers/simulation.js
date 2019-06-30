const { PythonShell } = require('python-shell')

exports.simulate = function(req, res) {
  let options = {
    args: [JSON.stringify(req.body)],
    scriptPath: './python/',
  }
  PythonShell.run('simulation.py', options, function(err, data) {
    if (err) {
      console.log(err)
      res.status(500).send('Something went wrong.')
    } else {
      console.log(data)
      res.status(200).send(data)
    }
  })
}
