const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

require('dotenv').config();
require('./database/dbConnection')

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const commRoute = require('./routes/commRoute');
const workersRoute = require('./routes/workersRoute')
const supervisorsRoute = require('./routes/supervisorsRoutes')
const adminsRoute = require('./routes/adminsRoute');

app.use('/', commRoute);
app.use('/worker', workersRoute);
app.use('/supervisor', supervisorsRoute);
app.use('/admin', adminsRoute);

module.exports = app;