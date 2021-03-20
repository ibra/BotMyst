const Discord = require('discord.js')
const {
    SuccessColor, 
    Prefix
} = require('../../config.json');

module.exports = {
    name: "info",
    description: "A command that shows the latency of the bot",
    aliases: ['about'],
    usage: `${Prefix}info [Displays Information about bot]`,
    category: "Bot",
   
    execute: async function(client, message, args) {

        //Create an embed with info about the bot.
        const embed = new Discord.MessageEmbed();  
        embed.setAuthor('BotMyst > About')
        embed.setDescription(`BotMyst is a general-pupose utility bot currently written by [IbrahimDev](https://github.com/ibra), and initially conceptualized by [CodeMyst](https://github.com/CodeMyst). The bot was initially created by CodeMyst [in C#](https://github.com/BotMyst/BotMyst), and this current one is built [in JS](https://github.com/BotMyst/BotMystRevival). Heres some more information on the bot:`);
        embed.addField("Version","0.9.3")

        //Get version of Discord.JS Package
        const file = '../../node_modules/discord.js/package.json';
        const json = require(file);
        const discordVersion = json.version;
        
        //Add other information such as the latency, and the bots current prefix.
        embed.addField("Discord.JS Version",discordVersion)
        embed.addField("Latency",`\`${client.ws.ping}\` ms`)
        embed.addField("Prefix",`\`${Prefix}\``)
        embed.setColor(SuccessColor);
        embed.setThumbnail('https://i.ibb.co/nsbPyPR/botmyst.png')
    
        message.channel.send(embed); 
    }
}