"use strict";

var fetch = require('node-fetch');

var Discord = require('discord.js');

module.exports = {
  name: "covid",
  description: "Track a country or worldwide COVID-19 cases",
  aliases: ['cov', 'covd'],
  usage: ">covid Canada [Returns Information About COVID-19 cases in America]",
  execute: function execute(client, message, args) {
    var countries, noArgs;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //removing prefix
            countries = args.join(" "); //Error Embed if there is no argument

            noArgs = new Discord.MessageEmbed().setTitle('Missing arguments').setColor(0xFF0000).setDescription('You are missing some arguments! (ex: >covid all or >covid Canada)').setTimestamp();

            if (args[0]) {
              _context.next = 5;
              break;
            }

            message.react('👎');
            return _context.abrupt("return", message.channel.send(noArgs));

          case 5:
            if (args[0] === "all") {
              fetch("https://covid19.mathdro.id/api").then(function (response) {
                return response.json();
              }).then(function (data) {
                var confirmed = data.confirmed.value.toLocaleString();
                var recovered = data.recovered.value.toLocaleString();
                var deaths = data.deaths.value.toLocaleString();
                var embed = new Discord.MessageEmbed().setTitle("Worldwide COVID-19 Stats \uD83C\uDF0E").setColor(3066993).addField('Confirmed Cases', confirmed).addField('Recovered', recovered).addField('Deaths', deaths);
                message.channel.send(embed);
              });
            } else {
              fetch("https://covid19.mathdro.id/api/countries/".concat(countries)).then(function (response) {
                return response.json();
              }).then(function (data) {
                var confirmed = data.confirmed.value.toLocaleString();
                var recovered = data.recovered.value.toLocaleString();
                var deaths = data.deaths.value.toLocaleString();
                var embed = new Discord.MessageEmbed().setTitle("COVID-19 Stats for **".concat(countries, "**")).addField('Confirmed Cases', confirmed).addField('Recovered', recovered).addField('Deaths', deaths).setColor(3066993).setTimestamp(Date.now());
                message.channel.send(embed);
              })["catch"](function (e) {
                var errorEmbed = new Discord.MessageEmbed().setTitle('Couldnt find the country you provided!').setDescription('Check your spelling in case of an error, or make sure you are providing the name of a country!').setColor(15158332);
                message.channel.send(errorEmbed);
              });
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};