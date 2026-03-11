const express = require('express');
const app = express();

require('./database/dbConnection')
require('dotenv').config();



module.exports = app;