const express = require('express');
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser')
require('dotenv').config({path: './config/.env'})
require('./config/db')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/api/user', userRoutes)

app.listen(process.env.PORT, ()=> {
    console.log(`Listening on port ${process.env.PORT}`);
})