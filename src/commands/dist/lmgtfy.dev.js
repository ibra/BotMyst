"use strict";

var Discord = require("discord.js");

var _require = require('../config.json'),
    SuccessColor = _require.SuccessColor;

module.exports = {
  name: "lmgtfy",
  description: "Gives idiots a link to click to search stuff on google since people are too lazy to do it themselves.",
  aliases: ['lmgt'],
  usage: ">lmgtfy How to make a discord bot [Googles the search for you]",
  execute: function execute(client, message, args) {
    var search, replaced, lmgtfyEmbed;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Manipulate string so it can be placed in middle of URL
            search = args.join(" ");
            replaced = search.split(' ').join('+'); //Make an embed and set the Title URL to https://lmgtfy.com + our manipulated string.

            lmgtfyEmbed = new Discord.MessageEmbed().setTitle("Heres what i could find for: " + search).setURL('https://lmgtfy.com/?q=' + replaced + '&iie=1').setTimestamp(Date.now()).setColor(SuccessColor); //Send the embed.

            message.channel.send(lmgtfyEmbed);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};