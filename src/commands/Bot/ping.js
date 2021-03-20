const Discord = require('discord.js')
const {
    SuccessColor
} = require('../../config.json');

module.exports = {
    name: "ping",
    description: "A command that gives info about the bot",
    usage: `${Prefix}ping [Gets Latency]`,
    category: "Bot",
  
    execute: async function(client, message, args) {

        const ping = new Discord.MessageEmbed();

        //Setting Embed Values
        ping.setDescription(`🏓 Pong! Latency is about \`${client.ws.ping}\` ms`);
        ping.setTimestamp(Date.now());
        ping.setColor(SuccessColor);
          
        //Send the embed.
        message.channel.send(ping);
    }
}