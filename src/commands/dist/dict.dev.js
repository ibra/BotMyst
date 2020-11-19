"use strict";

var Discord = require('discord.js');

var _require = require('../config.json'),
    DictionaryKey = _require.DictionaryKey,
    SuccessColor = _require.SuccessColor,
    FailureColor = _require.FailureColor;

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
            //Remove prefix.
            wordLookup = args.join(" "); //Create new embed.

            dictionaryEmbed = new Discord.MessageEmbed(); //Use the dict.define function that gives us the definition

            dict.define(wordLookup, function (error, result) {
              if (error == null) {
                var i = 1; // i is the currenter page number.

                dictionaryEmbed.setTitle("*".concat(result[i].partOfSpeech, "*"));
                dictionaryEmbed.setAuthor(wordLookup);
                dictionaryEmbed.setColor(SuccessColor);
                dictionaryEmbed.setFooter("Page ".concat(i, " of ").concat(result.length - 1) + " | " + "Requested by ".concat(message.author.username));
                var res = result[i].definition.replace(/:/g, "");
                dictionaryEmbed.setDescription('**Definitions:** ' + res); //This creates a reaction collecter that checks if the ⬅️ or ➡️ emojis are reacted on

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
                      time: 50000 //Set how long the client will be listening for reactions

                    });
                    var forwards = msg.createReactionCollector(forwardReaction, {
                      time: 50000 //Set how long the client will be listening for reactions

                    });
                    backwards.on('collect', function (r) {
                      if (i === 0) return; //We can't go back from the first page, so we return.

                      i--; //Decrement down a page.    
                      //Update the embed with the new information.

                      dictionaryEmbed.setTitle("*".concat(result[i - 1].partOfSpeech, "*"));
                      var res = result[i - 1].definition.replace(/:/g, "");
                      dictionaryEmbed.setDescription(res);
                      dictionaryEmbed.setColor(SuccessColor);
                      dictionaryEmbed.setFooter("Page ".concat(i, " of ").concat(result.length - 1) + " | " + "Requested by ".concat(message.author.username));
                      msg.edit(dictionaryEmbed);
                    });
                    forwards.on('collect', function (r) {
                      if (i === result.length - 1) return; //We can't go forward from the last page, so we return.

                      i++; //Increment up a page.
                      //Update the embed with the new information.

                      dictionaryEmbed.setTitle("*".concat(result[i].partOfSpeech, "*"));
                      var res = result[i - 1].definition.replace(/:/g, "");
                      dictionaryEmbed.setDescription(res);
                      dictionaryEmbed.setColor(SuccessColor);
                      dictionaryEmbed.setFooter("Page ".concat(i, " of ").concat(result.length - 1) + " | " + "Requested by ".concat(message.author.username));
                      msg.edit(dictionaryEmbed);
                    });
                  });
                }); //The suggestions error means that the word wasnt in the dictionary but there were similar words that might be what the user is looking for.
              } else if (error === "suggestions") {
                dictionaryEmbed.setTitle(wordLookup + ' was not found in dictionary. Possible suggestions:'); //Add all the suggestion words.

                for (var i = 0; i < 5; i++) {
                  dictionaryEmbed.addField(result[i], "⠀");
                }

                dictionaryEmbed.setColor(FailureColor);
                message.channel.send(dictionaryEmbed);
              } else return message.channel.send("There is not enough information on that word to give its definition!"); //If the error is something else, log it.

            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};