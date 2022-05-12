const express = require('express');
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'})
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.use('*', checkUser);
app.get('/jwtid', requireAuth, (req, res)=> {
    res.status(200).send(res.locals.user.id)
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Listening on port ${process.env.PORT}`);
})