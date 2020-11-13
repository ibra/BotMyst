const Discord = require('discord.js')
const {
    SuccessColor
} = require('../config.json');
module.exports = {
    name: "about",
    description: "A command that shows the latency of the bot",
    aliases: ['info'],
    usage: ">about [Displays Information about bot]",

    execute: async function(client, message, args) {

        const embed = new Discord.MessageEmbed();  //Create an embed with info about the bot.
        embed.setTitle('BotMyst > About')
        embed.setDescription(`BotMyst is a general-pupose utility bot written by [IbrahimDev](https://github.com/minidevz) and [CodeMyst](https://github.com/CodeMyst)`);
        embed.setColor(SuccessColor);
        //Send the embed. 
        message.channel.send(embed); 
    }
}