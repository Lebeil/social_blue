const express = require('express');
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const http = require('http');
require('dotenv').config({path: './config/.env'})
require('./config/db')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//routes
app.use('/api/user', userRoutes)

app.listen(process.env.PORT, ()=> {
    console.log(`Listening on port ${process.env.PORT}`);
})