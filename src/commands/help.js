const Discord = require("discord.js");
const fs = require("fs");
const { stripIndents } = require("common-tags");
const config = require('../config.json');

module.exports = {
    name: "help",
    description: "Gives you a list of all commands",

   async run (client, message, args) {
    if(!args[0])
    {
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
    } else {
      let helpModule = args.join(" ");
      return getCMD(client, message, args[0]);

    }
  }
}
 function getCMD(client, message, input) {
  const embed = new Discord.MessageEmbed()
  const cmd = client.commands.get(input.toLowerCase());
  let info = `No information found for command **${input.toLowerCase()}**`;
  if (!cmd) {
      return message.channel.send(embed.setDescription(info));
  }

  // Add all cmd info to the embed
  if (cmd.name) info = `**Command name**: ${cmd.name}`;
  if (cmd.description) info += `\n**Description**: ${cmd.description}`;
 
  return message.channel.send(embed
      .setTitle(`BotMyst => ${cmd.name} | Prefix is ${config.PREFIX}`)
      .setColor(3066993)
      .setDescription(info)
      .setTimestamp());

}



