var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

//body parser for post requests
var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'})); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    limit : '50mb',
    // to support URL-encoded bodies
    extended: true,
    parameterLimit:50000
}));

app.use('/user', require('./routes/user'));
app.use('/apikey', require('./routes/apikey'));
app.use('/', require('./routes/index'));

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
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
