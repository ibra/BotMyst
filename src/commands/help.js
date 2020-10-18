const Discord = require("discord.js");
const config = require('../config.json');

module.exports = {
    name: "help",
    description: "Gives you a list of all commands",

   async run (client, message, args) {
      const data = [];
      const { commands } = message.client;
      var desc = data.push(commands.map(command => command.name).join(', '));  
      return message.author.send(data, { split: true })
        .then(() => {
        if (message.channel.type === 'dm') return;
        message.reply('I\'ve sent you a DM with all my commands!');
      })
      .catch(error => {
        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
        message.reply('Uh oh. Something went wrong when trying to DM you');
      });
  }
}



