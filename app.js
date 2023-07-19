const createError = require('http-errors');
const express = require('express');
const {resolve} = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//TODO delete recipeRouter and usersRouter to import only indexRouter
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipeRouter = require('./routes/recipes.routes');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(resolve('public')));

app.use(recipeRouter);
app.use(indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('error');
});

module.exports = app;
