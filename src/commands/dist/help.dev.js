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

var _require = require("common-tags"),
    stripIndents = _require.stripIndents;

var _require2 = require('../config.json'),
    SuccessColor = _require2.SuccessColor,
    FailureColor = _require2.FailureColor;

module.exports = {
  name: "help",
  description: "Gives you a list of all commands",
  aliases: ['h'],
  usage: ">help [gives all commands] or >help [command] which gives info about the command",
  category: "Bot",
  execute: function execute(client, message, args) {
    var getCMD, getAll;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getAll = function _ref2(client, message, prefix) {
              var embed = new Discord.MessageEmbed().setColor(SuccessColor);

              var commands = function commands(category) {
                return client.commands.filter(function (cmd) {
                  return cmd.category === category;
                }).map(function (cmd) {
                  return "`".concat(cmd.name, "`");
                }).join(", ");
              }; //the command list


              var info = client.category.map(function (cat) {
                return stripIndents(_templateObject(), cat[0].toUpperCase() + cat.slice(1), commands(cat));
              }).reduce(function (string, category) {
                return string + "\n" + category;
              });
              return message.channel.send(embed.setTitle("BotMyst > Help").setColor("ORANGE").setDescription('Here are all of the commands for BotMyst, if you want more information about the command, do >help [command]:' + info).setTimestamp());
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
              return message.channel.send(embed.setAuthor("BotMyst > ".concat(cmd.name)).setColor(SuccessColor).setDescription(info).setTimestamp());
            };

            if (!args[0]) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", getCMD(client, message, args[0]));

          case 6:
            return _context.abrupt("return", getAll(client, message, ">"));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};