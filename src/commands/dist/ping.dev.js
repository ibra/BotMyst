"use strict";

var Discord = require('discord.js');

var _require = require('../config.json'),
    SuccessColor = _require.SuccessColor;

module.exports = {
  name: "ping",
  description: "A command that gives info about the bot",
  usage: ">ping [Gets Latency]",
  category: "Bot",
  execute: function execute(client, message, args) {
    var ping;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ping = new Discord.MessageEmbed(); //Setting Embed Values

            ping.setDescription("\uD83C\uDFD3 Pong! Latency is about `".concat(client.ws.ping, "` ms"));
            ping.setTimestamp(Date.now());
            ping.setColor(SuccessColor); //Send the embed.

            message.channel.send(ping);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};