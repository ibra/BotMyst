const Discord = require('discord.js')
const {
    SuccessColor, PREFIX
} = require('../../config.json');

module.exports = {
    name: "info",
    description: "A command that shows the latency of the bot",
    aliases: ['about'],
    usage: ">about [Displays Information about bot]",
    category: "Bot",
   
    execute: async function(client, message, args) {

        const embed = new Discord.MessageEmbed();  //Create an embed with info about the bot.
        embed.setAuthor('BotMyst > About')
        embed.setDescription(`BotMyst is a general-pupose utility bot written by (me) [IbrahimDev](https://youtube.com/minidevs) and [CodeMyst](https://github.com/CodeMyst). The bot was initially created by CodeMyst [in C#](https://github.com/BotMyst/BotMyst), and this current one is built [in JS](https://github.com/BotMyst/BotMystRevival). Heres some more information on the bot:`);
        embed.addField("Version","0.81")

        //Get version of Discord.JS Package
        const file = '../../node_modules/discord.js/package.json';
        const json = require(file);
        const discVersion = json.version;

        embed.addField("Discord.JS Version",discVersion)
        embed.addField("Latency",`\`${client.ws.ping}\` ms`)
        embed.addField("Prefix",`\`${PREFIX}\``)
        embed.setColor(SuccessColor);
        embed.setThumbnail('https://i.ibb.co/nsbPyPR/botmyst.png')
    
        message.channel.send(embed); 
    }
}