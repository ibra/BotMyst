const Discord = require("discord.js");


module.exports = {
    name: "lmgtfy",
    description: "Gives idiots a link to click to search stuff on google since people are too lazy to do it themselves.",
    aliases: ['lmgt'],
    usage: ">lmgtfy How to make a discord bot [Googles the search for you]",
    execute: async function(client, message, args){
      const search = args.join(" "); 
      var replaced = search.split(' ').join('+');
      const lmgtfyEmbed = new Discord.MessageEmbed()
      .setTitle("Heres what i could find for: " + search)
      .setURL('https://lmgtfy.com/?q=' + replaced + '&iie=1')
      .setTimestamp(Date.now())
      .setColor(3066993);
      message.channel.send(lmgtfyEmbed);
    }

}