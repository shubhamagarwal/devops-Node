const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/tools')
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// create express app
const app = express();
require('./app/routes/note.routes.js')(app);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3333, () => {
    console.log("Server is listening on port 3333");
});