"use strict";

var Discord = require('discord.js');

var thesaurus = require('thesaurus');

var _require = require('../config.json'),
    SuccessColor = _require.SuccessColor;

module.exports = {
  name: 'synonyms',
  description: 'Search something and get the synonyms of that word',
  aliases: ['syn'],
  usage: "its like >dict but instead of meanings it gives synonyms",
  category: "Core",
  execute: function execute(client, message, args) {
    var wordLookup, res, pages, page, wordEmbed;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wordLookup = args.join(" "); //Removing the prefix from argument.

            res = thesaurus.find(wordLookup); //Calling thesaurus.find, and passing our manipulated string as an argument.

            pages = res; //Assign our result to a variable

            page = 1; //the current page we are on.

            wordEmbed = new Discord.MessageEmbed() //Creating a new embed
            .setColor(SuccessColor).setTitle('Here are all synonyms for: ' + wordLookup).setDescription(pages[page - 1]).setFooter("Page ".concat(page, " of ").concat(pages.length)).setTimestamp(); //Send the embed and create a reaction collecter to listen for page changes.

            message.channel.send(wordEmbed).then(function (msg) {
              msg.react('⬅️').then(function (r) {
                msg.react('➡️'); //Checking if the message author is reacting, these values are arguments for our reaction collecter.

                var backwardsReaction = function backwardsReaction(reaction, user) {
                  return reaction.emoji.name === '⬅️' && user.id === message.author.id;
                };

                var forwardReaction = function forwardReaction(reaction, user) {
                  return reaction.emoji.name === '➡️' && user.id === message.author.id;
                }; //Creating the actual reaction collecter


                var backwards = msg.createReactionCollector(backwardsReaction, {
                  time: 50000
                });
                var forwards = msg.createReactionCollector(forwardReaction, {
                  time: 50000
                }); //check if there is a backward reaction collected.

                backwards.on('collect', function (r) {
                  if (page === 1) return;
                  page--;
                  wordEmbed.setDescription(pages[page - 1]);
                  wordEmbed.setFooter("Page ".concat(page, " of ").concat(pages.length));
                  msg.edit(wordEmbed);
                }); //check if there is a forward reaction collected.

                forwards.on('collect', function (r) {
                  if (page === pages.length) return;
                  page++;
                  wordEmbed.setDescription(pages[page - 1]);
                  wordEmbed.setFooter("Page ".concat(page, " of ").concat(pages.length));
                  msg.edit(wordEmbed);
                });
              });
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};