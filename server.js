const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');


// creating the express app
const app = express(); 

// parse the requests w/ content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests w/ content type - application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');

mongoose.Promise = global.Promise; 

// using mongoose to connect to the database
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`)
    .then( () => { console.log("Successfully connected to the database!")})
    .catch(err => { console.log("Unable to connect to the database.");
    process.exit();
});



// GET request for the index route
app.get('/', (req, res) => {
    res.json( {"message": "This is the notes API. "});
});


// to listen for requests
app.listen(config.port, () => {
    console.log(`${config.appName} is listening on port ${config.port} !!`);
});