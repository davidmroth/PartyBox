'use strict';

var ref = require('ref');
var ffi = require('ffi');

var lightShowStatus = 'stopped';
var lightShowSpeed = 1000;
var arch = process.arch;

var stagekitlibrary = ffi.Library('./server/arch/libstagekit-' + arch, {
  "sk_init": ['void', ['string']],
  "sk_close": ['void', []],
  "sk_nostrobe": ['void', []],
  "sk_slowstrobe": ['void', []],
  "sk_medstrobe": ['void', []],
  "sk_faststrobe": ['void', []],
  "sk_fasteststrobe": ['void', []],
  "sk_fogon": ['void', []],
  "sk_fogoff": ['void', []],
  "sk_setred": ['void', ['int']],
  "sk_setyellow": ['void', ['int']],
  "sk_setgreen": ['void', ['int']],
  "sk_setblue": ['void', ['int']],
  "sk_setleds": ['void', ['int', 'int', 'int', 'int']]
});

function percentHit(outOf) {
  if ((Math.floor(Math.random() * (outOf - 1 + 1)) + 1) !== outOf)
    return false
  else
    return true
}

function getRandomInt(min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  if (percentHit(3))
    return 0;
  else
    return ranNum;
}

function setLeds(red, yellow, green, blue) {
  var red = red || 0;
  var yellow = yellow || 0;
  var green = green || 0;
  var blue = blue || 0;

  stagekitlibrary.sk_setleds(this.red, this.yellow, this.green, this.blue);
}

function leds() {
  lightShowStatus = 'started';
  ledsRandom();
}

function ledsRandom() {
  var red = getRandomInt(0, 255);
  var yellow = getRandomInt(0, 255);
  var green = getRandomInt(0, 255);
  var blue = getRandomInt(0, 255);

  //console.log('Red: ' + red + ' Yellow: ' + yellow + ' Green: ' + green + ' Blue: ' + blue)
  stagekitlibrary.sk_setleds(red, yellow, green, blue);

  setTimeout(function() {
    if (lightShowStatus === 'started')
      ledsRandom();
    else
      stagekitlibrary.sk_setleds(0, 0, 0, 0);
  }, lightShowSpeed);
}

function ledsPartyMode(speed) {
  lightShowSpeed = speed;
  if (lightShowStatus !== 'started')
    ledsRandom();
  lightShowStatus = 'started';
}

function ledsOff() {
  lightShowStatus = 'stopped';
  stagekitlibrary.sk_setleds(0, 0, 0, 0);
}

function fogShortBurst() {
  var timeout = 3000;
  stagekitlibrary.sk_fogon();
  setTimeout(function() {
      stagekitlibrary.sk_fogoff();
      console.log('fog auto-off executed');
  }, timeout)
}

function fogLongBurst() {
  var timeout = 5000;
  stagekitlibrary.sk_fogon();
  setTimeout(function() {
      stagekitlibrary.sk_fogoff();
      console.log('fog auto-off executed');
  }, timeout)
}

function masterOff() {
  lightShowStatus = 'stopped';
  stagekitlibrary.sk_setleds(0, 0, 0, 0);
  stagekitlibrary.sk_fogoff();
  stagekitlibrary.sk_nostrobe();
}

// INITIALIZE
stagekitlibrary.sk_init(null);

// STROBE LIGHT
exports.strobeOff = stagekitlibrary.sk_nostrobe;
exports.strobeSlow = stagekitlibrary.sk_slowstrobe
exports.strobeMedium = stagekitlibrary.sk_medstrobe;
exports.strobeFast = stagekitlibrary.sk_faststrobe;
exports.strobeRapid = stagekitlibrary.sk_fasteststrobe;

// FOG
exports.fogShortBurst = fogShortBurst;
exports.fogLongBurst = fogLongBurst;
exports.fogOff = stagekitlibrary.sk_fogoff;

// LEDS
exports.setRedLed = stagekitlibrary.sk_setred;
exports.setYellowLed = stagekitlibrary.sk_setyellow;
exports.setGreenLed = stagekitlibrary.sk_setgreen;
exports.setBlueLed = stagekitlibrary.sk_setblue;
exports.setAllLeds = setLeds;
exports.ledsOff = ledsOff;
exports.ledsPartyMode = ledsPartyMode;

// Master
exports.masterOff = masterOff;

// INIT FUNCTIONS
exports.init = stagekitlibrary.sk_init;
exports.close = stagekitlibrary.sk_close;

// For debugging
exports.reload = function() {
  delete require.cache[require.resolve('stagekit')];
  return require('stagekit');
};
