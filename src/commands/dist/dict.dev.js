"use strict";

var Discord = require('discord.js');

var _require = require('../config.json'),
    DictionaryKey = _require.DictionaryKey;

var Dictionary = require('./../modules/dictionary'),
    //pass the constructor a config object with key
dict = new Dictionary({
  key: DictionaryKey
});

module.exports = {
  name: "dict",
  description: "A command that shows the meaning of a word",
  aliases: ['dictionary'],
  usage: ">dict idiot [returns definition of word]",
  execute: function execute(client, message, args) {
    var wordLookup, dictionaryEmbed;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wordLookup = args.join(" ");
            dictionaryEmbed = new Discord.MessageEmbed();
            dict.define(wordLookup, function (error, result) {
              if (error == null) {
                var i = 1;
                dictionaryEmbed.setTitle("*".concat(result[i].partOfSpeech, "*"));
                dictionaryEmbed.setAuthor(wordLookup);
                dictionaryEmbed.setColor("RANDOM");
                dictionaryEmbed.setFooter("Page ".concat(i, " of ").concat(result.length - 1) + " | " + "Requested by ".concat(message.author.username));
                var res = result[i].definition.replace(/:/g, "");
                dictionaryEmbed.setDescription('**Definitions:** ' + res);
                message.channel.send(dictionaryEmbed).then(function (msg) {
                  msg.react('⬅️').then(function (r) {
                    msg.react('➡️');

                    var backwardsReaction = function backwardsReaction(reaction, user) {
                      return reaction.emoji.name === '⬅️' && user.id === message.author.id;
                    };

                    var forwardReaction = function forwardReaction(reaction, user) {
                      return reaction.emoji.name === '➡️' && user.id === message.author.id;
                    };

                    var backwards = msg.createReactionCollector(backwardsReaction, {
                      time: 50000
                    });
                    var forwards = msg.createReactionCollector(forwardReaction, {
                      time: 50000
                    });
                    backwards.on('collect', function (r) {
                      if (i === 0) return;
                      i--;
                      dictionaryEmbed.setTitle("*".concat(result[i - 1].partOfSpeech, "*"));
                      var res = result[i - 1].definition.replace(/:/g, "");
                      dictionaryEmbed.setDescription(res);
                      dictionaryEmbed.setColor("RANDOM");
                      dictionaryEmbed.setFooter("Page ".concat(i, " of ").concat(result.length - 1) + " | " + "Requested by ".concat(message.author.username));
                      msg.edit(dictionaryEmbed);
                    });
                    forwards.on('collect', function (r) {
                      if (i === result.length - 1) return;
                      i++;
                      dictionaryEmbed.setTitle("*".concat(result[i].partOfSpeech, "*"));
                      var res = result[i - 1].definition.replace(/:/g, "");
                      dictionaryEmbed.setDescription(res);
                      dictionaryEmbed.setColor("RANDOM");
                      dictionaryEmbed.setFooter("Page ".concat(i, " of ").concat(result.length - 1) + " | " + "Requested by ".concat(message.author.username));
                      msg.edit(dictionaryEmbed);
                    });
                  });
                });
              } else if (error === "suggestions") {
                dictionaryEmbed.setTitle(wordLookup + ' was not found in dictionary. Possible suggestions:');
                var suggestions = "";

                for (var i = 0; i < 5; i++) {
                  dictionaryEmbed.addField(result[i], "⠀");
                }

                console.log(suggestions);
                dictionaryEmbed.setColor("RANDOM");
                message.channel.send(dictionaryEmbed);
              } else console.log(error);
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};