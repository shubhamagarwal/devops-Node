const devops = require('../models/devops.model.js');
exports.findAll = (req, res) => {
    //res.send('notes');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(JSON.stringify({
  "todos": [
    {
      "id": 1,
      "title": "Jenkins1",
      "complete": false
    },
    {
      "id": 2,
      "title": "SOAPUI1",
      "complete": false
    },
    {
      "id": 3,
      "title": "Docker1",
      "complete": false
    }
  ]
}));
};

exports.find = (req, res) => {
   devops.find()
    .then(notes => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};