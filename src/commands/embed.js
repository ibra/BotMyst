const Discord = require('discord.js')
const {
    CodeMyst, SuccessColor, FailureColor
} = require('../config.json');

module.exports = {
    name: "embed",
    description: "A command that sends a message as an embed",
    usage: ">embed [Message] [Lol]",
    permission: "Bot Owner",
    category: "Misc",
    
    execute: async function(client, message, args) {
 
        //Only allow the command to work if the author of the command is CodeMyst
        if (message.author.id == CodeMyst) {
            sendEmbed(message);
        } else {
            let errorEmbed = new Discord.MessageEmbed()
                .setColor(FailureColor)
                .setAuthor("> Error 403")
                .setDescription("Only CodeMyst can use this command!")
            message.channel.send(errorEmbed);
        }

    }
}



function sendEmbed(message) {
    let command = message.content;
    let channel = message.channel;
    let author = message.author;

    //Some string manipulation that removes the square parenthesis to allow for both Titles and Descriptions
    let titleStart = command.indexOf('[');
    let titleEnd = command.indexOf(']');
    let title = command.substr(titleStart + 1, titleEnd - titleStart - 1);

    let descStart = command.indexOf('[', titleStart + 1);
    let descEnd = command.indexOf(']', titleEnd + 1);
    let description = command.substr(descStart + 1, descEnd - descStart - 1);

    //Create new embed
    let embed = new Discord.MessageEmbed();
    embed.author = title,
    embed.description = description;
    embed.color = SuccessColor;




    //Send the embed.
    channel.send(embed);
}