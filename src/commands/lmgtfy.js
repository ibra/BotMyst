const Discord = require("discord.js");


module.exports = {
    name: "lmgtfy",
    description: "Gives idiots a link to click to search stuff on google since people are too lazy to do it themselves.",

    async run (client, message, args){
      const search = args.join(" "); 
      var replaced = search.split(' ').join('+');
      const lmgtfyEmbed = new Discord.MessageEmbed()
      .setTitle("Here is how to " + search)
      .setURL('https://lmgtfy.com/?q=' + replaced + '&iie=1')
      .setTimestamp(Date.now())
      .setColor(3066993);
      message.channel.send(lmgtfyEmbed);
    }

}