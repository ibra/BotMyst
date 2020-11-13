"use strict";

var weather = require('weather-js');

var Discord = require('discord.js');

var _require = require('../config.json'),
    weatherDegreeType = _require.weatherDegreeType,
    SuccessColor = _require.SuccessColor,
    FailureColor = _require.FailureColor;

module.exports = {
  name: "weather",
  description: "Checks a weather forecast. If you are having problems make sure you arent checking the weather for an entire country.",
  aliases: ['forecast'],
  usage: ">weather Brisbane [Returns Weather Forecast] ",
  execute: function execute(client, message, args) {
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Using weather-js's handy .find function to get a simple result with all the info we need.
            weather.find({
              search: args.join(" "),
              degreeType: weatherDegreeType
            }, function (error, result) {
              if (!args[0]) {
                //if there are no arguments provided, send an error message.
                var errorEmbed = new Discord.MessageEmbed().setTitle('Please Specify a location!!').setDescription("e.g: >weather Brisbane [Returns Weather Forecast]").setColor(FailureColor);
                message.channel.send(errorEmbed);
                return message.react('👎');
              }

              if (result === undefined || result.length === 0) {
                //if the result is not found, then send an error embed.
                var _errorEmbed = new Discord.MessageEmbed().setTitle('Couldnt find the location you provided!').setDescription('Check your spelling in case of an error, or make sure you are providing the name of a valid location / area, and not a country!').setColor(FailureColor);

                message.channel.send(_errorEmbed);
                return message.react('👎');
              }

              var current = result[0].current;
              var location = result[0].location;
              var weatherinfo = new Discord.MessageEmbed().setDescription("**".concat(current.skytext, "**")).setAuthor("Weather forecast for ".concat(current.observationpoint)).setThumbnail(current.imageUrl).setColor(SuccessColor) //Weather Information Content.
              .addField('Timezone', "UTC".concat(location.timezone), true).addField('Degree Type', 'Fahrenheit', true).addField('Temperature', "".concat(current.temperature, "\xB0"), true).addField('Wind', current.winddisplay, true).addField('Feels like', "".concat(current.feelslike, "\xB0"), true).addField('Humidity', "".concat(current.humidity, "%"), true); //Send the embed.

              message.channel.send(weatherinfo);
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};