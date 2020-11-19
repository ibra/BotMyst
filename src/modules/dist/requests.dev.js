"use strict";

var _this = void 0;

//I do not own most of the following code. It was a file i downloaded off github with an MIT License
var Util = require('./util');

var wiki = require('wikijs')["default"];

var _ = require('lodash');

var cheerio = require('cheerio');

var rp = require('request-promise');

var Logger = new Util.Logger(); // All languages supported by the bot.
// Before adding any additional API URLs, add an alias for this new language in commands/wiki.js.

var apiUrl = {
  'de': 'https://de.wikipedia.org/w/api.php',
  'en': 'https://en.wikipedia.org/w/api.php',
  'es': 'https://es.wikipedia.org/w/api.php',
  'fr': 'https://fr.wikipedia.org/w/api.php',
  'ru': 'https://ru.wikipedia.org/w/api.php',
  'sl': 'https://sl.wikipedia.org/w/api.php'
};
/**
 * Function which gets data from Wikipedia to send a short summary into the channel.
 *
 * @param {Message} msg - Message class of Discord.js
 * @param {String} argument - Argument sent by the user (!wiki [argument])
 * @param {String} lang - Language in which the result should be sent.
 *
 * */

exports.getWikipediaShortSummary = function _callee(msg, argument, lang) {
  var search, wikiPage, results, shortedSummary;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(wiki({
            apiUrl: apiUrl[lang],
            headers: {
              'User-Agent': 'wikipedia-bot-requests (https://julianyaman.de; julianyaman@posteo.eu) requests.js'
            }
          }).search(argument));

        case 2:
          search = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(wiki({
            apiUrl: apiUrl[lang],
            headers: {
              'User-Agent': 'wikipedia-bot-requests (https://julianyaman.de; julianyaman@posteo.eu) requests.js'
            }
          }).page(search.results[0])["catch"](function (e) {
            Logger.error(e);
            msg.react('👎')["catch"](function (err) {
              return Logger.error(err);
            });
            msg.channel.send({
              embed: {
                color: 0xe74c3c,
                description: 'Sorry, there was an error while trying to get the wiki page. ' + 'Please check your spelling or try another keyword.\n\n' + '*Is the command still not working after many attempts?* \n' + '*Please write an issue on GitHub or use **(!suggest)***'
              }
            });
          }));

        case 5:
          wikiPage = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Promise.all([wikiPage.raw.title, wikiPage.raw.fullurl, wikiPage.mainImage(), wikiPage.summary()]));

        case 8:
          results = _context.sent;
          // Shorten the summary to 768 chars...
          shortedSummary = results[3].split('\n');
          shortedSummary = _.take(shortedSummary, 2);
          shortedSummary = shortedSummary.toString().substring(0, 768) + '...'; // Sending the embed

          _context.next = 14;
          return regeneratorRuntime.awrap(msg.channel.send({
            embed: {
              color: 0x111111,
              author: {
                icon_url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
                name: 'Wikipedia'
              },
              thumbnail: {
                url: results[2]
              },
              title: results[0],
              url: results[1],
              description: shortedSummary,
              timestamp: new Date()
            }
          }));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**
 * Function which gets data from Wikipedia to send a short summary into the channel.
 *
 * @param {Message} msg - Message class of Discord.js
 * @param {String} argument - Argument sent by the user (!wiki-info [info] [argument])
 *
 * */


exports.getWikipediaShortInformation = function (msg, argument) {
  wiki().search(argument).then(function (data) {
    // Getting the first result of the search results
    // TODO: Find a way to handle disambiguation pages
    var bestResult = data.results[0];
    wiki().page(bestResult).then(function (page) {
      page.fullInfo().then(function (info) {
        return console.log(info);
      });
    })["catch"](function (e) {
      Logger.error("[2] An error occurred while requesting the data from Wikipedia - Searched for: '".concat(argument, "' - Best Result: '").concat(bestResult, "'"));
      Logger.errorChat(msg, e);
      msg.reply('sorry, an error occurred while trying to execute your command. Please check your spelling or try another keyword.');
    });
  })["catch"](function (e) {
    Logger.error("[1] An error occurred while requesting the data from Wikipedia - Searched for: '".concat(argument, "' - no result"));
    Logger.errorChat(msg, e);
    msg.reply('sorry, an error occurred while trying to execute your command. Please check your spelling or try another keyword.');
  });
};
/**
 * Function to get the references of a Wikipedia article
 *
 * @param {Message} msg - Message class of Discord.js
 * @param {String} search - Search value written by the user
 * @param range - The range of how many sources the user want
 *
 * */


exports.getWikipediaReferences = function _callee4(msg, search) {
  var range,
      ranges,
      minRange,
      maxRange,
      formattedURI,
      _args5 = arguments;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          range = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 'all';

          // check if a range was given
          if (range !== 'all') {
            // split range into min and max range
            ranges = _.split(range, '-');
            minRange = _.toNumber(ranges[0]) - 1;
            maxRange = _.toNumber(ranges[1]) - 1; // If no maximum range was given but just one number, then the user should get only the specific reference

            if (_.isNaN(maxRange) && range !== 'info') {
              // Set maxRange to the single number
              maxRange = minRange;
            } // TODO: SET A MAXIMUM RANGE!!
            // What to do when a number is not in the allowed range


            if ((minRange < 0 || maxRange < 1) && minRange !== maxRange && range !== 'info') {
              minRange = 0;
              maxRange = 1;
              msg.reply('you can\'t set the minimum range under or equal 0 and the maximum range under 2.');
            } // Search for the results


            wiki().search(search).then(function (data) {
              // Getting the first result of the search results
              var bestResult = data.results[0];
              wiki().page(bestResult).then(function (page) {
                // Getting the references / sources of a Wikipedia article with WikiJS
                page.references().then(function _callee3(references) {
                  var referencesAmount, formattedURI, source, sourceToUser;
                  return regeneratorRuntime.async(function _callee3$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          // How many references exists?
                          referencesAmount = references.length; // If range is equal to "info" then just send the information, how many references exists for this Wikipedia article

                          if (!(ranges[0] === 'info')) {
                            _context4.next = 5;
                            break;
                          }

                          // Sending a link to the reference list of the wikipedia Article
                          formattedURI = 'https://en.wikipedia.org/wiki/' + search.replace(' ', '_') + '#References'; // Sending an embed with the reference the user wanted

                          msg.channel.send({
                            embed: {
                              color: 3066993,
                              author: {
                                icon_url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
                                name: 'Wikipedia'
                              },
                              title: "References of ".concat(bestResult, " - Check out this list: ").concat(formattedURI),
                              timestamp: new Date(),
                              description: "There are a total of ".concat(referencesAmount, " references for the Wikipedia article about ").concat(bestResult, ".")
                            }
                          });
                          return _context4.abrupt("return");

                        case 5:
                          if (!(minRange === maxRange)) {
                            _context4.next = 19;
                            break;
                          }

                          // Since it takes some time to create the array, just let the user know the bot is working with starting the 'type' thing
                          msg.channel.startTyping();
                          source = references[minRange]; // console.log(sources)

                          if (!(source !== undefined)) {
                            _context4.next = 16;
                            break;
                          }

                          sourceToUser = []; // getting the title of the reference

                          _context4.next = 12;
                          return regeneratorRuntime.awrap(_this.parseTitleFromWebsite(source).then(function ($) {
                            // add the data to the array which will be then send to the user
                            sourceToUser[0] = {
                              name: "Reference ".concat(minRange + 1),
                              value: "".concat($('title').text(), "\n").concat(source)
                            };
                          })["catch"](function (err) {
                            if (err.statusCode) {
                              Logger.error("References command: ".concat(err.name, " ").concat(err.statusCode, " Error while trying to access: ").concat(source));
                            } else {
                              Logger.errorChat(msg, err);
                            }

                            sourceToUser[0] = {
                              name: "Reference ".concat(minRange + 1),
                              value: "*Cannot get the title from the page...*\n".concat(source)
                            };
                          }));

                        case 12:
                          // Sending an embed with the reference the user wanted
                          msg.channel.send({
                            embed: {
                              color: 3066993,
                              author: {
                                icon_url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
                                name: 'Wikipedia'
                              },
                              title: "References of ".concat(bestResult),
                              timestamp: new Date(),
                              fields: sourceToUser
                            }
                          }); // Then we should stop typing since we do nothing lol

                          msg.channel.stopTyping();
                          _context4.next = 17;
                          break;

                        case 16:
                          msg.channel.send({
                            embed: {
                              color: 3066993,
                              author: {
                                icon_url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
                                name: 'Wikipedia'
                              },
                              title: "References of ".concat(bestResult),
                              timestamp: new Date(),
                              description: "Cannot send any information because the given reference number is not valid. (Max references for *".concat(search, ":* **").concat(referencesAmount, "**)")
                            }
                          });

                        case 17:
                          _context4.next = 21;
                          break;

                        case 19:
                          _context4.next = 21;
                          return regeneratorRuntime.awrap(function _callee2() {
                            var sources, sourcesSendToUser, _loop, i;

                            return regeneratorRuntime.async(function _callee2$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    // if not, then get the sources the user want with his given range..
                                    sources = references.slice(minRange, maxRange + 1); // Create an array as the value for the embed fields key

                                    sourcesSendToUser = []; // Since it takes some time to create the array, just let the user know the bot is working with starting the 'type' thing

                                    _context3.next = 4;
                                    return regeneratorRuntime.awrap(msg.channel.startTyping());

                                  case 4:
                                    _loop = function _loop(i) {
                                      return regeneratorRuntime.async(function _loop$(_context2) {
                                        while (1) {
                                          switch (_context2.prev = _context2.next) {
                                            case 0:
                                              _context2.next = 2;
                                              return regeneratorRuntime.awrap(_this.parseTitleFromWebsite(sources[i]).then(function ($) {
                                                // add the data to the array which will be then send to the user
                                                sourcesSendToUser[i] = {
                                                  name: "Reference ".concat(minRange + i + 1),
                                                  value: "".concat($('title').text(), "\n").concat(sources[i])
                                                };
                                              })["catch"](function (err) {
                                                // any errors?
                                                if (err.statusCode) {
                                                  Logger.error("References command: ".concat(err.name, " ").concat(err.statusCode, " Error while trying to access: ").concat(sources[i]));
                                                } else {
                                                  Logger.errorChat(msg, err);
                                                } // Write into the embed field value that there was an error


                                                sourcesSendToUser[i] = {
                                                  name: "Reference ".concat(minRange + i + 1),
                                                  value: "*Cannot get the title from the page...*\n".concat(sources[i])
                                                };
                                              }));

                                            case 2:
                                            case "end":
                                              return _context2.stop();
                                          }
                                        }
                                      });
                                    };

                                    i = 0;

                                  case 6:
                                    if (!(i < sources.length)) {
                                      _context3.next = 12;
                                      break;
                                    }

                                    _context3.next = 9;
                                    return regeneratorRuntime.awrap(_loop(i));

                                  case 9:
                                    i++;
                                    _context3.next = 6;
                                    break;

                                  case 12:
                                    // Sending an embed with all the sources the user wanted
                                    msg.channel.send({
                                      embed: {
                                        color: 3066993,
                                        author: {
                                          icon_url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
                                          name: 'Wikipedia'
                                        },
                                        title: "References of ".concat(bestResult),
                                        timestamp: new Date(),
                                        fields: sourcesSendToUser
                                      }
                                    }); // Then we should stop typing since we do nothing lol

                                    msg.channel.stopTyping();

                                  case 14:
                                  case "end":
                                    return _context3.stop();
                                }
                              }
                            });
                          }());

                        case 21:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  });
                })["catch"](function (e) {
                  Logger.error("[3] References command: An error occurred while requesting references from a Wikipedia - Searched for: '".concat(search, "' - Best Result: '").concat(bestResult, "'"));
                  Logger.errorChat(msg, e);
                  msg.reply('sorry, an error occurred while trying to execute your command. Please check your spelling or try another keyword.');
                });
              })["catch"](function (e) {
                Logger.error("[2] References command: An error occurred while getting the page content from a Wikipedia - Searched for: '".concat(search, "' - Best Result: '").concat(bestResult, "'"));
                Logger.errorChat(msg, e);
                msg.reply('sorry, an error occurred while trying to execute your command. Please check your spelling or try another keyword.');
              });
            })["catch"](function (e) {
              Logger.error("[1] References command: An error occurred while searching for '".concat(search, "'"));
              Logger.errorChat(msg, e);
              msg.reply('sorry, an error occurred while trying to execute your command. Please check your spelling or try another keyword.');
            });
          } else {
            // Sending a link to the reference list of the wikipedia Article
            formattedURI = 'https://en.wikipedia.org/wiki/' + search.replace(' ', '_') + '#References';
            msg.channel.send({
              embed: {
                color: 3066993,
                author: {
                  icon_url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png',
                  name: 'Wikipedia'
                },
                title: "References of ".concat(_.startCase(search)),
                timestamp: new Date(),
                description: "".concat(formattedURI)
              }
            });
          }

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};
/**
 * Get data from a web page. Yeah, that's everything...
 *
 * @param {String} uri - URI from a website of your choice.
 * @since 1.4 (development version)
 * */


exports.parseTitleFromWebsite = function (uri) {
  var options = {
    uri: uri,
    transform: function transform(body) {
      return cheerio.load(body);
    }
  }; // Do the request!

  return rp(options);
};