'use strict';

module.exports = function(app, express, settings) {
  app.use(express.static(settings.publicFolder))

  app.get('/', function(req, res) {
    res.render('party_control.jade', {
      title: 'Party Box!!',
      cssFiles: settings.cssFiles,
      jsFiles: settings.jsFiles,
    });
  });
}
