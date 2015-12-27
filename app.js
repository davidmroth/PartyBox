'use strict';

// Get ENV variables
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 5001;

var express = require('express');
var stagekit = require('server/logic/stagekit');
var run_command = require('server/logic/run_command');

// Configs
var app = require('server/config/express')(express);
var compress = require('server/logic/compressJSCSS.js')(app, env);

var viewSettings = compress.engine(function(err) {
  if(err) return console.log(err);
  console.log("\nPeformance tuning complete!");
});

var views = require('server/config/views')(app, express, viewSettings);
var routes = require('server/config/routes')(app, stagekit, run_command);

var exitHandler = function() {
  console.log('Exit called; cleaning up...');
  stagekit.close();
  process.exit(0);
};

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);

app.set('port', port)
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port') + '\n\n')
});
