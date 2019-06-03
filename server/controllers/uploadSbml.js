const multer = require("multer");
const { PythonShell } = require("python-shell");
const fs = require("fs");

let filename;
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function(req, file, callback) {
    filename = file.originalname;
    callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).single("file");

module.exports = async function(req, res) {
  if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
  }

  await upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
  });
  const options = {
    args: [filename]
  };
  PythonShell.run("sbmlParser.py", options, function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong in the python script.");
    } else {
      fs.unlinkSync("./uploads/" + filename);
      res.status(200).send(data);
    }
  });
};
