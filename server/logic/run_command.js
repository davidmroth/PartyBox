'use strict';

var exec = require('child_process').exec;

function softReset() {
  console.log('Soft reboot...');
  process.exit(0);
}

function hardReset() {
  var child = exec("bin/reboot", function (error, stdout, stderr) {
    console.log('Rebooting...');
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}

exports.softReset = softReset;
exports.hardReset = hardReset;
