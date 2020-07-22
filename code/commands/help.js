const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Gives you a list of all commands",

   async run (client, message, args) {
    const helpArgs = args.join(" "); 
    
    if(!helpArgs[0]) {
        var embed = new Discord.MessageEmbed()
            .setAuthor(`Here is the Avaible Commands to use:`)
            .setDescription('```covid | dict | help | ping | suggest | unity | weather | wiki```')
            .addFields({ name: 'Prefix', value: '`>`', inline: true})
            .setColor('#00FFF3')
            
        message.channel.send(embed);
    } 
   
     }
  
  
    }



