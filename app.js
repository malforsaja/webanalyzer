var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
//var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var scrapepage = require('./routes/scrapepage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/', scrapepage);

//----------------------------------------------------
// number of headings in a page
//         var $ = cheerio.load('<!DOCTYPE html>\n' +
//             '<title>HTML Standard</title>\n' +
//             '<body>\n' +
//             '  <hgroup id="document-title">\n' +
//             '    <h1>HTML</h1>\n' +
//             '    <h2>Living Standard — Last Updated 12 August 2016</h2>\n' +
//             '    <h2>Living Standard — Last Updated 12 August 2017</h2>\n' +
//             '  </hgroup>\n' +
//             '  <p>Some intro to the document.</p>\n' +
//             '  <h2>Table of contents</h2>\n' +
//             '  <ol id=toc>...</ol>\n' +
//             '  <h2>First section</h2>\n' +
//             '  <p>Some intro to the first section.</p>\n' +
//             '</body>');
//         var pageHeading = $('body hgroup h2').text();
//
//         console.log(pageHeading);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
