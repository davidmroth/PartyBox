'use strict';

module.exports = function(app, stagekit, serverCommand) {
  // FOG
  app.post('/stagekit/fogShortBurst', function(req, res) {
   stagekit.fogShortBurst();
   res.json('ok');
  });

  app.post('/stagekit/fogLongBurst', function(req, res) {
   stagekit.fogLongBurst();
   res.json('ok');
  });

  app.post('/stagekit/fogOff', function(req, res) {
    stagekit.fogOff();
    res.json('ok');
  });

  // STROBE LIGHT
  app.post('/stagekit/strobeSlow', function(req, res) {
    stagekit.strobeSlow();
    res.json('ok');
  });

  app.post('/stagekit/strobeMedium', function(req, res) {
    stagekit.strobeMedium();
    res.json('ok');
  });

  app.post('/stagekit/strobeFast', function(req, res) {
    stagekit.strobeFast();
    res.json('ok');
  });

  app.post('/stagekit/strobeRapid', function(req, res) {
    stagekit.strobeRapid();
    res.json('ok');
  });

  app.post('/stagekit/strobeOff', function(req, res) {
    stagekit.strobeOff();
    res.json('ok');
  });

  // LEDS
  app.post('/stagekit/ledsOff', function(req, res) {
    stagekit.ledsOff();
    res.json('ok');
  });

  app.post('/stagekit/ledsPartyModeSlow', function(req, res) {
    stagekit.ledsPartyMode(1000);
    res.json('ok');
  });

  app.post('/stagekit/ledsPartyModeMedium', function(req, res) {
    stagekit.ledsPartyMode(500);
    res.json('ok');
  });

  app.post('/stagekit/ledsPartyModeFast', function(req, res) {
    stagekit.ledsPartyMode(100);
    res.json('ok');
  });

  // MASTER
  app.post('/stagekit/masterOff', function(req, res) {
    stagekit.masterOff();
    res.json('ok');
  });

  // SYSTEM
  app.post('/stagekit/softReset', function(req, res) {
    stagekit.close();
    serverCommand.softReset();
    res.json('ok');
  });

  app.post('/stagekit/hardReset', function(req, res) {
    serverCommand.hardReset();
    res.json('ok');
  });
};
