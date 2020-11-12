"use strict";

var Discord = require('discord.js');

var thesaurus = require('thesaurus');

module.exports = {
  name: 'synonyms',
  description: 'Search something and get the synonyms of that word',
  aliases: ['syn'],
  usage: "its like >dict but instead of meanings it gives synonyms",
  execute: function execute(client, message, args) {
    var wordLookup, res, pages, page, wordEmbed;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wordLookup = args.join(" ");
            res = thesaurus.find(wordLookup);
            pages = res;
            page = 1;
            wordEmbed = new Discord.MessageEmbed().setColor(3066993).setTitle('Here are all synonyms for: ' + wordLookup).setDescription(pages[page - 1]).setFooter("Page ".concat(page, " of ").concat(pages.length)).setTimestamp();
            message.channel.send(wordEmbed).then(function (msg) {
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
                  if (page === 1) return;
                  page--;
                  wordEmbed.setDescription(pages[page - 1]);
                  wordEmbed.setFooter("Page ".concat(page, " of ").concat(pages.length));
                  msg.edit(wordEmbed);
                });
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