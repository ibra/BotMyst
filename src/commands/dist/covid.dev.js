"use strict";

var fetch = require('node-fetch');

var Discord = require('discord.js');

var _require = require('../config.json'),
    SuccessColor = _require.SuccessColor,
    FailureColor = _require.FailureColor;

module.exports = {
  name: "covid",
  description: "Track a country or worldwide COVID-19 cases",
  aliases: ['cov', 'covd'],
  usage: ">covid Canada [Returns Information About COVID-19 cases in Canada]",
  category: "Core",
  execute: function execute(client, message, args) {
    var countries, noArgs;
    return regeneratorRuntime.async(function execute$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //removing prefix
            countries = args.join(" "); //Error Embed if there is no argument

            noArgs = new Discord.MessageEmbed().setAuthor('> Error 400').setColor(FailureColor).setDescription('You are missing some arguments!').setFooter('ex: >covid all or >covid Canada').setTimestamp();

            if (args[0]) {
              _context.next = 5;
              break;
            }

            //Also react because yes.
            message.react('👎');
            return _context.abrupt("return", message.channel.send(noArgs));

          case 5:
            //If all arguments are provided, use the API to get the covid cases.
            if (args[0] === "all") {
              fetch("https://covid19.mathdro.id/api").then(function (response) {
                return response.json();
              }).then(function (data) {
                var confirmed = data.confirmed.value.toLocaleString();
                var recovered = data.recovered.value.toLocaleString();
                var deaths = data.deaths.value.toLocaleString();
                var embed = new Discord.MessageEmbed().setAuthor("Worldwide COVID-19 Stats \uD83C\uDF0E").setColor(SuccessColor).addField('Confirmed Cases', confirmed).addField('Recovered', recovered).addField('Deaths', deaths);
                message.channel.send(embed);
              });
            } else {
              fetch("https://covid19.mathdro.id/api/countries/".concat(countries)).then(function (response) {
                return response.json();
              }).then(function (data) {
                //Assign all provided response data to variables
                var confirmed = data.confirmed.value.toLocaleString();
                var recovered = data.recovered.value.toLocaleString();
                var deaths = data.deaths.value.toLocaleString();
                var country = data.country;
                var embed = new Discord.MessageEmbed().setAuthor("COVID-19 Stats for **".concat(country, "**")).addField('Confirmed Cases', confirmed).addField('Recovered', recovered).addField('Deaths', deaths).setColor(SuccessColor).setTimestamp(Date.now());
                message.channel.send(embed);
              })["catch"](function (e) {
                var errorEmbed = new Discord.MessageEmbed().setAuthor('> Error 404').setDescription('Couldnt find the country you provided!').setFooter('Check your spelling in case of an error, or make sure you are providing the name of a country!').setTimestamp().setColor(FailureColor); //send the embed.    

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