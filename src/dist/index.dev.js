"use strict";

//Discord Initialization
var Discord = require("discord.js");

var _require = require('fs'),
    readdirSync = _require.readdirSync;

var _require2 = require('./config.json'),
    BotToken = _require2.BotToken,
    BotSpam = _require2.BotSpam,
    PREFIX = _require2.PREFIX,
    SuccessColor = _require2.SuccessColor; // Creating a new bot client that we login with


var client = new Discord.Client();
client.commands = new Discord.Collection(); //Going through each command and setting the command to the actual discord command

var commandFiles = readdirSync("./commands").filter(function (file) {
  return file.endsWith('.js');
});
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = commandFiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var file = _step.value;

    var command = require("./commands/".concat(file));

    client.commands.set(command.name, command);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

client.on("message", function _callee(message) {
  var embed, args, command, fullCmd, botError;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (message.mentions.has(client.user.id)) {
            //we check, whether the bot is mentioned, client.user returns the user that the client is logged in as
            embed = new Discord.MessageEmbed();
            embed.setDescription("**yes sir**");
            embed.setColor(SuccessColor);
            message.channel.send(embed);
          } //Checking if message starts with prefix, the message was sent by a bot or if the message was in a direct message. If so, returning.


          if (!(!message.content.startsWith(PREFIX) || message.author.bot || message.channel.type === 'dm')) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          //String Manipulation to remove the prefix and lowercasing all arguments so they are not case-senstitive
          args = message.content.slice(PREFIX.length).split(/ +/);
          command = args.shift().toLowerCase(); // fullCmd includes the command AS WELL AS its aliases

          fullCmd = client.commands.get(command) || client.commands.find(function (cmd) {
            return cmd.aliases && cmd.aliases.includes(command);
          });

          if (fullCmd) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return");

        case 8:
          if (!(message.channel.id != BotSpam && BotSpam != "None")) {
            _context.next = 12;
            break;
          }

          botError = new Discord.MessageEmbed().setDescription('This bot is still in its early stages so its commands are restricted to the #bot channel.').setColor(0xFF0000).setTimestamp();
          message.reply(botError).then(function (msg) {
            msg["delete"]({
              timeout: 5000
            });
          })["catch"](console.error);
          return _context.abrupt("return");

        case 12:
          //Trying to execute the fullCmd, passed in arguments: client, message and args.  
          try {
            fullCmd.execute(client, message, args);
          } catch (error) {
            console.error(error);
          }

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}); //Just a simple console log for debugging an error if the bot fails to turn on

client.on("error", console.error);
client.on("ready", function () {
  //Run if the bot starts, and logs in, successfully.
  client.user.setActivity("Helping out ".concat(client.users.cache.size, " users."));
  commandFiles.forEach(function (cmd) {
    console.log("".concat(cmd, " loaded."));
  });
}); //Login with the bot token provided in config.json.

client.login(BotToken);