'use strict';

var sys = require('sys');
var debug = require('debug')('DLi-ETT');
var logger = require('morgan');

module.exports = function(express) {
  var app = express();

  app.use(logger('dev'));
  //app.use(express.static('client/public'))
  app.set('views', 'server/views');

  return app;
};
