const express = require("express");

require('dotenv').config();
const app = express();

// route
require('./resources/games').route(app);

module.exports = {
    app
};
