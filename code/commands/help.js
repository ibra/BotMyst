const Discord = require("discord.js");
var fs = require('fs');
var files = fs.readdirSync('commands');
module.exports = {
    name: "help",
    description: "Gives you a list of all commands",

   async run (client, message, args) {
    const helpArgs = args.join(" "); 
    
    if(!helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
            .setAuthor(`Here is a list of all available commands.`)
            .addFields({ name: 'Prefix', value: '`>`', inline: true})
            .setColor(3066993);
            for (let i = 0, len = files.length; i < len; i++) {
              embed.addField(files.module.exports.name)
              embed.addField(files.module.exports.description)
            }
           
         message.channel.send(embed);
    } 
   
     }
  
  
    }



