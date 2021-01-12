"use strict";

//Discord Initialization
var Discord = require("discord.js");

var _require = require('fs'),
    readdirSync = _require.readdirSync,
    fstat = _require.fstat;

var _require2 = require('./config.json'),
    BotToken = _require2.BotToken,
    BotSpam = _require2.BotSpam,
    PREFIX = _require2.PREFIX,
    SuccessColor = _require2.SuccessColor; // Creating a new bot client that we login with


var client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = readdirSync("./commands/"); //An array that will contain commands that may have problems in them.

var BuggedCommands = []; //Going through each command and setting the command to the actual discord command

readdirSync("./commands/").forEach(function (dir) {
  var commands = readdirSync("./commands/".concat(dir, "/")).filter(function (file) {
    return file.endsWith(".js");
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var file = _step.value;

      var pull = require("./commands/".concat(dir, "/").concat(file));

      if (pull.name) {
        client.commands.set(pull.name, pull);
      } else {
        BuggedCommands.push(file);
        return "continue";
      }

      if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(function (alias) {
        return client.aliases.set(alias, pull.name);
      });
    };

    for (var _iterator = commands[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ret = _loop();

      if (_ret === "continue") continue;
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
});
if (BuggedCommands.length > 0) console.log("❌ | Something happened to these files: " + BuggedCommands.toString());else console.log("✅ | Bot is looking good!");
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
}); //Just a a few simple console logs for debugging errors/warnings if the bot faces any problems

client.on('error', function (e) {
  return console.error(e);
});
client.on('warning', function (e) {
  return console.warn(e);
});
client.on("ready", function () {
  //Run if the bot starts, and logs in, successfully.
  client.user.setActivity("help | Helping out in ".concat(client.channels.cache.size, " channels."));
}); //Login with the bot token provided in config.json.

client.login(BotToken);