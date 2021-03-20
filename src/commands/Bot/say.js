const Discord = require('discord.js')
const {
    BotAuthor, 
    Prefix, 
    FailureColor
} = require('../../config.json');

module.exports = {
    name: "say",
    description: "A command that sends a user-sent message as a bot",
    usage: `${Prefix}say Hello World!`,
    permission: "Bot Owner",
    category: "Bot",
    
    execute: async function(client, message, args) {
 
        //Only allow the command to work if the author of the command is the bot author.
        if (message.author.id == BotAuthor) {    

          const commandlessMessage = args.join(" ")
          if (message.mentions.channels.first()) client.channels.cache.get(message.mentions.channels.first().id).send(commandlessMessage).catch(error => {
            let errorEmbed = new Discord.MessageEmbed()
            if(error.code == 50001)
             { 
                errorEmbed.setColor(FailureColor)
                .setColor(FailureColor)
                .setAuthor("> Error 403")
                .setDescription("I was unable to access this channel. | Missing Permissions")
             } 

             message.channel.send(errorEmbed);

          });
          else message.channel.send(commandlessMessage);  
             
        } else {
            let errorEmbed = new Discord.MessageEmbed()
                .setColor(FailureColor)
                .setAuthor("> Error 403")
                .setDescription(`Only the BotAuthor (${BotAuthor})  can use this command!`)
            message.channel.send(errorEmbed);
        } 

    }
}

