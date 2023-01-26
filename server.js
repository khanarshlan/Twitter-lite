const express = require('express');
const config = require('./config/server.config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// Databse connection
mongoose.connect(config.db, () => {
    console.log(`Database connected`);
})

// Routes
require('./routes/auth.routes')(app);
require('./routes/tweet.routes')(app);
require('./routes/follow_following.routes')(app);

// Server connection
app.listen(config.port, () => {
    console.log(`Server connected on port ${config.port}`);
})