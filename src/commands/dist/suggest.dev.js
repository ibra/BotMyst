"use strict";

var Trello = require("trello");

var config = require('../config.json');

var TrelloInstance = new Trello(config.TrelloKey, config.TrelloToken);

var Discord = require('discord.js');

module.exports = {
  name: "suggest",
  description: "A command that adds whatever you suggest into a trello card under 100 characters.",
  aliases: ['feedback'],
  usage: ">suggest Make the bot good lol [Adds suggestion to trello list]",
  execute: function execute(client, message, args) {
    var suggestion, trelloError, trelloSuccess;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            suggestion = args.join(" "); //Making sure a user cant send a very long suggestion, and sending an error embed.

            if (!(suggestion.length > 100)) {
              _context.next = 7;
              break;
            }

            trelloError = new Discord.MessageEmbed().setTitle('I was unable to send this suggestion!').setColor(0xFF0000).setDescription('Your suggestion contains more than 100 characters in it!').setTimestamp(Date.now());
            message.channel.send(trelloError);
            return _context.abrupt("return");

          case 7:
            // Otherwise, we proceed with sending the suggestion using the Trello Api 
            TrelloInstance.addCard(suggestion, 'This suggestion was made by: ' + message.author.tag + ", and their id is: " + message.author, "5f1859be01143f419cf398e9");
            trelloSuccess = new Discord.MessageEmbed().setTitle('The suggestion has been added!').setURL('https://trello.com/b/8wf6nzML/codemyst-revival').setColor(3066993).setDescription('The following suggestion has been added to the developers trello list!: ' + suggestion).setTimestamp();
            message.channel.send(trelloSuccess);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};