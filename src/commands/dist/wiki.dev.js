"use strict";

var Util = require('./../modules/util');

var Logger = new Util.Logger();

var requests = require('./../modules/requests');

var _require = require('../config.json'),
    FailureColor = _require.FailureColor;

module.exports = {
  name: 'wiki',
  description: 'Search something on Wikipedia with this command and get a short summary of it.',
  aliases: ['wikipedia'],
  usage: ">wiki Lord Of The Rings [Gives A Short Summary from WikiPedia]",
  execute: function execute(client, message, args) {
    var command, requestLang, searchValue;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            command = args.join(" ");
            requestLang = 'en'; //This is the Wikipedia language in which we send our request.

            if (!args[0]) {
              message.react('👎')["catch"](function (e) {
                return Logger.error(e);
              });
              message.channel.send({
                embed: {
                  color: FailureColor,
                  description: 'The command you gave was invalid or doesnt exist'
                }
              });
            } else {
              //Using some regex to make the string understandable to the getWikipediaShortSummary() function.
              searchValue = args.toString().replace(/,/g, ' ');
              searchValue = searchValue.replace(config.PREFIX + command + ' ', ''); //Call the getWikipediaShortSummary() function.

              requests.getWikipediaShortSummary(message, searchValue, requestLang)["catch"](function (e) {
                return Logger.error(e);
              });
            }

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};