'use strict';

window.onload = (function(exports, $) {

  exports.stageKitAPI = {
    // FOG
    fogShortBurst: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/fogShortBurst'
      });
    },
    fogLongBurst: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/fogLongBurst'
      });
    },
    fogOff: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/fogOff'
      });
    },
    // STROBE LIGHT
    strobeOff: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/strobeOff'
      });
    },
    strobeSlow: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/strobeSlow'
      });
    },
    strobeMedium: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/strobeMedium'
      });
    },
    strobeFast: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/strobeFast'
      });
    },
    strobeRapid: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/strobeFast'
      });
    },
    // LEDS
    ledsOff: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/ledsOff'
      });
    },
    ledsPartyModeSlow: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/ledsPartyModeSlow'
      });
    },
    ledsPartyModeMedium: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/ledsPartyModeMedium'
      });
    },
    ledsPartyModeFast: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/ledsPartyModeFast'
      });
    },  // MASTER
    masterOff: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/masterOff'
      });
    },
    // SYSTEM
    hardResetStageKit: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/hardReset'
      });
    },
    softResetStageKit: function () {
      $.ajax({
        type: 'POST',
        url: '/stagekit/softReset'
      });
    },
  }

  exports.confirmAction = function(callBack, msg, e) {
    e.preventDefault();
    var msgbox = $('#msgBox');
    var primaryButton = msgbox.find('.modal-footer .btn-primary');
    var cancelButton = msgbox.find('.modal-footer .btn-default');
    var closeButton = msgbox.find('.modal-header button');

    msgbox.find('.modal-content .modal-body').html(msg);
    closeButton.bind("click", function() { msgbox.hide(); });
    cancelButton.bind("click", function() { msgbox.hide(); });
    primaryButton.bind("click", function() { eval(callBack + '()'); msgbox.hide();});

    msgbox.show();
  }

  //$.material.init()

})(window, jQuery);

