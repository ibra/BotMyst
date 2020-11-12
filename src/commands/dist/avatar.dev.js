"use strict";

var Discord = require('discord.js');

module.exports = {
  name: "avatar",
  description: "Returns metioned users avatar and returns your avatar if there are no arguments",
  aliases: ['av'],
  usage: ">avatar @User#001 [Returns Their Avatar]",
  execute: function execute(client, message, args) {
    var avatarEmbed, user;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Create new message Embed 
            avatarEmbed = new Discord.MessageEmbed(); //If there is no mention, then display Author's avatar.

            if (!message.mentions.users.first()) {
              avatarEmbed.setTitle(message.author.username);
              avatarEmbed.setColor(3066993);
              avatarEmbed.setAuthor("Your Avatar!");
              avatarEmbed.setImage(message.author.displayAvatarURL());
            } //Otherwise, we display the mentioned users avatar.
            else {
                user = message.mentions.users.first();
                avatarEmbed.setTitle("".concat(user.username, "'s avatar!"));
                avatarEmbed.setColor(3066993);
                avatarEmbed.setImage(user.displayAvatarURL());
              } //Send the embed.


            message.channel.send(avatarEmbed);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};