const Discord = require('discord.js')

module.exports = {
    name: "about",
    description: "A command that shows the latency of the bot",
    aliases: ['info'],
    usage: ">about [Displays Information about bot]",
    execute: async function (client, message, args) {
        const embed = new Discord.MessageEmbed()
        .setTitle('BotMyst > About')
        .setDescription(`BotMyst is a general-pupose utility bot written by [IbrahimDev](https://github.com/minidevz) and [CodeMyst](https://github.com/CodeMyst)`)
        .setColor(3066993);
        message.channel.send(embed);
    }
}