var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var newUsersRouter = require('./routes/users/newuser');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/users/newuser', newUsersRouter);


module.exports = app;
