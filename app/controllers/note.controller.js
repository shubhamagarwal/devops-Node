const devops = require('../models/devops.model.js');
const admin = require('../models/user.model.js');

exports.find = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    devops.find()
        .then(notes => {
            res.status(200).send({ data: notes });
        }).catch(err => {
            res.status(500).send({
                error: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.create = (req, res) => {
    const tools = new devops({
        id: 5,
        type: req.body.typeId,
        typeDescription: req.body.typeValue,
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryValue,
        title: req.body.title,
        complete: false
    });

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    tools.save()
        .then(data => {
            res.send(data);
            res.status(200).send({
                data: { message: "completed" }
            });
        }).catch(err => {
            res.status(500).send({
                error: err.message || "Some error occurred while creating the Note."
            });
        });
}

exports.login = (req, res) => {
    const adminData = new admin({
        username: req.body.username,
        password: req.body.password,
        isLoggedIn: false
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    admin.find()
        .then(userDetail => {
            // userDetail = [{ username: 'admin', password: 'admin' }];
            if (userDetail.length !== 0) {
                if (userDetail.length !== 0 && req.body.username === userDetail[0]['username'] && req.body.password === userDetail[0]['password']) {
                    //res.status(200).send({ data: { message: 'Login Successful', error: false } });

                    // adminData.update({
                    //     _id: '5b7cf76079a8b6302564362d'
                    // }, {
                    //         $set: {
                    //             username: req.body.username,
                    //             password: req.body.password,
                    //             isLoggedIn: true
                    //         }
                    //     }, function (err, res) {
                    //         if (err) throw err;
                    //         console.log("1 document updated", res);
                    //         // db.close();
                    //     });

                    // adminData.save()
                    //     .then(data => {
                    //         res.send(data);
                    //         res.status(200).send({
                    //             data: { message: "completed" }
                    //         });
                    //     }).catch(err => {
                    //         res.status(500).send({
                    //             error: err.message || "Some error occurred while creating the Note."
                    //         });
                    //     });
                    //admin.insert({ test: 1 });
                    // // , function (err, result) {
                    // if (err) {
                    //     res.status(200).send({ data: { message: 'Login Unsuccessful', error: true } });
                    // } else {
                    //     console.log(result);
                    res.status(200).send({ data: { message: 'Login Successfully', error: false } });
                    // }
                    // }
                } else {
                    res.status(200).send({ data: { message: 'Incorrect username or password. Please try again.', error: true } });
                }
            } else {
                res.status(200).send({ data: { message: 'Something went wrong', error: true } });
            }
        }).catch(err => {
            res.status(500).send({
                error: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.options = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.send({ status: 204, message: "No content", error: false });
};


exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    devops.findByIdAndRemove(req.params.toolId)
        .then(note => {
            console.log('note :', note);
            if (!note) {
                return res.status(404).send({
                    status: 200, message: "Inside Note not found with id " + req.params.toolId, error: true
                });
            }
            res.send({ status: 200, message: "Note deleted successfully!", error: false });
        }).catch(err => {
            // console.error('err :', err);
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    status: 200, message: "CATCH" + req.params.toolId, error: true
                });
            }
            return res.status(500).send({
                status: 200, message: "Could not delete note with id " + req.params.toolId, error: true
            });
        });
};