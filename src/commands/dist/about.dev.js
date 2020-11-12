"use strict";

var Discord = require('discord.js');

module.exports = {
  name: "about",
  description: "A command that shows the latency of the bot",
  aliases: ['info'],
  usage: ">about [Displays Information about bot]",
  execute: function execute(client, message, args) {
    var embed;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            embed = new Discord.MessageEmbed();
            embed.setTitle('BotMyst > About');
            embed.setDescription("BotMyst is a general-pupose utility bot written by [IbrahimDev](https://github.com/minidevz) and [CodeMyst](https://github.com/CodeMyst)");
            embed.setColor(3066993);
            message.channel.send(embed);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};