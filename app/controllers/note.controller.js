const devops = require('../models/devops.model.js');
const admin = require('../models/user.model.js');

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

exports.create = (req, res) => {
  const tools = new devops({
        id: 5,
        type: req.body.typeId,
        typeDescription: req.body.typeValue,
        categoryId:req.body.categoryId,
        categoryName:req.body.categoryValue,
        title:req.body.title,
        complete:false
    });

    tools.save()
    .then(data => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
}

exports.login = (req, res) => {
  admin.find()
    .then(userDetail => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      if(req.body.username === userDetail[0]['username'] && req.body.password === userDetail[0]['password'])
        res.send({status:200, message:'Login Successfully', error: false});
      else
        res.send({status:200, message:'Login Unsuccessful', error: true});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}
