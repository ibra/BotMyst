const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "A command that shows the latency of the bot",

    async run (client, message, args) {

    
        const ping = new Discord.MessageEmbed()
        .setDescription(`🏓 Pong! Latency is about \`${client.ws.ping}\` ms`)
        .setTimestamp(Date.now())
        .setColor(3066993);
        message.channel.send(ping);
    }
}