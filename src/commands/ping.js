const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "A command that gives info about the bot",
    usage: ">ping [Gets Latency]",
    execute: async function(client, message, args) {

        const ping = new Discord.MessageEmbed();

        //Setting Embed Values
        ping.setDescription(`🏓 Pong! Latency is about \`${client.ws.ping}\` ms`);
        ping.setTimestamp(Date.now());
        ping.setColor(3066993);

        message.channel.send(ping);
    }
}