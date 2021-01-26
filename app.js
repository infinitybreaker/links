const express = require('express');
const path = require('path');


const axios = require('axios').default;

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
const dotenv = require('dotenv').config();

const DB_URL = process.env.DB_URL
const nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});


const conn = mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then((client) => {
    console.log('Connected to Database')

}).catch(error => { console.log(error) })

app.set('view engine', 'njk');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
