const Discord = require('discord.js')
const { CodeMyst } = require('../config.json');

module.exports = {
    name: "embed",
    description: "A command that sends a message as an embed",
    usage: ">embed [Message] [Lol]",
    permission: "Bot Owner",
    execute: async function (client, message, args) {
    if(message.author.id == CodeMyst)
        {
            sendEmbed(message);
        }
        
    }
}



function sendEmbed(message) {
    let command = message.content;
    let channel = message.channel;
    let author = message.author;


    let titleStart = command.indexOf('[');
    let titleEnd = command.indexOf(']');
    let title = command.substr(titleStart + 1, titleEnd - titleStart - 1);

 
    let descStart = command.indexOf('[', titleStart + 1);
    let descEnd = command.indexOf(']', titleEnd + 1);
    let description = command.substr(descStart + 1, descEnd - descStart - 1);

  
    let embed = new Discord.MessageEmbed();
        embed.title = title,
        embed.description = description;
  

    // set author based of passed-in message
    embed.setFooter(author.username, author.displayAvatarURL);

    // send embed to channel
    channel.send(embed);
}