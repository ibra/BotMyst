"use strict";

var Discord = require('discord.js');

var _require = require('../config.json'),
    SuccessColor = _require.SuccessColor;

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
            embed = new Discord.MessageEmbed(); //Create an embed with info about the bot.

            embed.setTitle('BotMyst > About');
            embed.setDescription("BotMyst is a general-pupose utility bot written by [IbrahimDev](https://github.com/minidevz) and [CodeMyst](https://github.com/CodeMyst)");
            embed.setColor(SuccessColor); //Send the embed. 

            message.channel.send(embed);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};