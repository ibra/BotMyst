"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["**", "** \n", ""], ["**", "** \\n", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Discord = require("discord.js");

var fs = require("fs");

var _require = require('../config.json'),
    PREFIX = _require.PREFIX;

var _require2 = require("common-tags"),
    stripIndents = _require2.stripIndents;

module.exports = {
  name: "help",
  description: "Gives you a list of all commands",
  aliases: ['h'],
  usage: ">help [gives all commands] or >help [command] which gives info about the command",
  execute: function execute(client, message, args) {
    var data, commands, desc, getCMD, getAll;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getAll = function _ref2(client, message, prefix) {
              var embed = new Discord.MessageEmbed().setColor(3066993); //all the commands

              var commands = function commands(category) {
                return client.commands.filter(function (cmd) {
                  return cmd.category === category;
                }).map(function (cmd) {
                  return "`".concat(cmd.name, "`");
                }).join(", ");
              }; //the command list


              var info = client.categories.map(function (cat) {
                return stripIndents(_templateObject(), cat[0].toUpperCase() + cat.slice(1), commands(cat));
              }).reduce(function (string, category) {
                return string + "\n" + category;
              });
              return message.channel.send(embed.setTitle("BotMyst => Help").setColor(3066993).setDescription("Here are all of the commands for BotMyst, if you want more information about the command, do `".concat(prefix, " help [command]` \n") + info).setTimestamp().setFooter("Requested by ".concat(message.author.username))); //this image is my bot pfp
            };

            getCMD = function _ref(client, message, input) {
              var embed = new Discord.MessageEmbed();
              var cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
              console.log(input);
              var info = "No information found for command **".concat(input.toLowerCase(), "**");

              if (!cmd) {
                return message.channel.send(embed.setDescription(info));
              } // Add all cmd info to the embed


              if (cmd.name) info = "**Command name**: ".concat(cmd.name);
              if (cmd.aliases) info += "\n**Aliases**: ".concat(cmd.aliases.map(function (a) {
                return "`".concat(a, "`");
              }).join(", "));
              if (cmd.description) info += "\n**Description**: ".concat(cmd.description);

              if (cmd.usage) {
                info += "\n**Usage**: ".concat(cmd.usage);
              }

              ;
              return message.channel.send(embed.setTitle("BotMyst => ".concat(cmd.name)).setColor(3066993).setDescription(info).setTimestamp());
            };

            if (!args[0]) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", getCMD(client, message, args[0]));

          case 6:
            data = [];
            commands = message.client.commands;
            desc = data.push(commands.map(function (command) {
              return command.name;
            }).join(', '));
            return _context.abrupt("return", message.author.send(data, {
              split: true
            }).then(function () {
              if (message.channel.type === 'dm') return;
              message.reply('I\'ve sent you a DM with all my commands!');
            })["catch"](function (error) {
              console.error("Could not send help DM to ".concat(message.author.tag, ".\n"), error);
              message.reply('Uh oh. Something went wrong when trying to DM you');
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};