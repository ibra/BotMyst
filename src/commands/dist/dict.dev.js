"use strict";

var Discord = require('discord.js');

var _require = require('../config.json'),
    SuccessColor = _require.SuccessColor,
    FailureColor = _require.FailureColor;

var fetch = require('node-fetch');

module.exports = {
  name: "dict",
  description: "A command that shows the meaning of a word",
  aliases: ['dictionary'],
  usage: ">dict idiot [returns definition of word]",
  category: "Core",
  execute: function execute(client, message, args) {
    var wordLookup, dictionaryEmbed, requestURL, results, json, phonetics, meaning, example;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Remove prefix.
            wordLookup = args.join(" "); //Create new embed.

            dictionaryEmbed = new Discord.MessageEmbed();
            requestURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
            _context.next = 5;
            return regeneratorRuntime.awrap(fetch("".concat(requestURL, "/").concat(wordLookup)));

          case 5:
            results = _context.sent;
            _context.next = 8;
            return regeneratorRuntime.awrap(results.json());

          case 8:
            json = _context.sent;

            if (json[0] != null) {
              phonetics = json[0].phonetics[0].text;
              meaning = json[0].meanings[0].definitions[0].definition;
              example = json[0].meanings[0].definitions[0].example;
              dictionaryEmbed.setAuthor("".concat(json[0].word, " | ").concat(phonetics));
              dictionaryEmbed.setFooter("e.g: " + example);
              dictionaryEmbed.setDescription(meaning);
              dictionaryEmbed.setColor(SuccessColor);
              message.channel.send(dictionaryEmbed);
            } else {
              dictionaryEmbed.setAuthor("> Error 404");
              dictionaryEmbed.setDescription("Sorry! I was unable to find that word.");
              dictionaryEmbed.setColor(FailureColor);
              message.channel.send(dictionaryEmbed);
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};