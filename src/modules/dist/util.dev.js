"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var colors = require('colors');

var dateTime = require('date-time');

colors.setTheme({
  info: 'green',
  data: 'gray',
  warn: 'yellow',
  error: 'red',
  debug: 'cyan'
});
/**
 * Returns a rounded number.
 *
 * @param {Number} value - The number you want to round.
 * @param {Number} precision - Precision of the decimal number.
 *
 * @private
 */
// Thanks Billy Moon for giving the answer how to make a more precise round function: https://stackoverflow.com/a/7343013

exports.roundNumber = function (value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

exports.Logger =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: "debug",
    value: function debug(text) {
      console.log("[DEBUG] [".concat(dateTime({
        local: true,
        showTimeZone: true
      }), "] ").concat(text).debug);
    }
  }, {
    key: "error",
    value: function error(text) {
      console.log("[ERR] [".concat(dateTime({
        local: true,
        showTimeZone: true
      }), "] ").concat(text).error);
    }
  }, {
    key: "errorChat",
    value: function errorChat(msg, text) {
      if (msg.channel.type === 'dm' || msg.channel.type === 'group') {
        console.log("[ERR] [".concat(dateTime({
          local: true,
          showTimeZone: true
        }), "] DM Chat: ").concat(text).error);
      } else {
        console.log("[ERR] [".concat(dateTime({
          local: true,
          showTimeZone: true
        }), "] (").concat(msg.guild.name, " | ").concat(msg.guild.id, "): ").concat(text).error);
      }
    }
  }, {
    key: "info",
    value: function info(text) {
      console.log("[INFO] [".concat(dateTime({
        local: true,
        showTimeZone: true
      }), "] ").concat(text).info);
    }
  }, {
    key: "warn",
    value: function warn(text) {
      console.log("[WARN] [".concat(dateTime({
        local: true,
        showTimeZone: true
      }), "] ").concat(text).warn);
    }
  }]);

  return _class;
}();