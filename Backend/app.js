const express = require('express');
const app = express();

require('dotenv').config();
require('./database/dbConnection')




module.exports = app;