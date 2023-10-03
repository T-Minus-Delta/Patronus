const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')

module.exports = (app) => {

    // Middleware for handling cors error
    app.use(cors());
    // Bodyparser middleware for accessing the request body from client
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // User management Apis
    userRoutes(app);

}