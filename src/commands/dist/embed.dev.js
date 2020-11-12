"use strict";

var Discord = require('discord.js');

var _require = require('../config.json'),
    CodeMyst = _require.CodeMyst;

module.exports = {
  name: "embed",
  description: "A command that sends a message as an embed",
  usage: ">embed [Message] [Lol]",
  permission: "Bot Owner",
  execute: function execute(client, message, args) {
    var errorEmbed;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (message.author.id == CodeMyst) {
              sendEmbed(message);
            } else {
              errorEmbed = new Discord.MessageEmbed().setColor(0xFF0000).setTitle("Only CodeMyst can use this command!");
              message.channel.send(errorEmbed);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};

function sendEmbed(message) {
  var command = message.content;
  var channel = message.channel;
  var author = message.author; //Some string manipulation that removes the square parenthesis to allow for both Titles and Descriptions

  var titleStart = command.indexOf('[');
  var titleEnd = command.indexOf(']');
  var title = command.substr(titleStart + 1, titleEnd - titleStart - 1);
  var descStart = command.indexOf('[', titleStart + 1);
  var descEnd = command.indexOf(']', titleEnd + 1);
  var description = command.substr(descStart + 1, descEnd - descStart - 1); //Create new embed

  var embed = new Discord.MessageEmbed();
  embed.title = title, embed.description = description;
  embed.color = 3066993; //Send the embed.

  channel.send(embed);
}