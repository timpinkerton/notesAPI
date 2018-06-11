const express = require('express');
const bodyParser = require('body-parser');

// creating the express app
const app = express(); 

// parse the requests w/ content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests w/ content type - application/json
app.use(bodyParser.json())

// GET request for the index route
app.get('/', (req, res) => {
    res.json( {"message": "This is the notes API. "});
});


// to listen for requests
app.listen(3000, () => {
    console.log("The server is listening on port 3000");
});