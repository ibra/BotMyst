const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Gives you a list of all commands",

   async run (client, message, args) {
      const data = [];
      const { commands } = message.client;
    
       var embed = new Discord.MessageEmbed()
       var desc = data.push(commands.map(command => command.name).join(', '));
       embed.setTitle("Here's a list of all my commands:");
       embed.setColor("RANDOM");
       embed.setDescription(desc);
       embed.setFooter(`You can send >help [command name]\` to get info on a specific command!`);
       return message.author.send(data, { split: true })
        .then(() => {
        if (message.channel.type === 'dm') return;
        message.reply('I\'ve sent you a DM with all my commands!');
      })
      .catch(error => {
        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
        message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
      });
  }
}



