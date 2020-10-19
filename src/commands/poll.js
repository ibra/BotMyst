const Discord = require('discord.js')

module.exports = {
    name: "poll",
    description: "Starts a simple thumbsup or down poll.",
    aliases: ['vote'],

    execute: async function (client, message, args) {
        let msgArgs = args.join(' ')

        if (!args[0]) {
            message.react('👎');
            return message.channel.send('Please tell me what you would like the poll to ask!')
        } else {
            const pollEmbed = new Discord.MessageEmbed()
            .setTitle(`**${msgArgs}**`)
            .setDescription('React with a 👍 or 👎')
            .setAuthor(message.author.username)
            .setColor('#10FFE9')
            message.channel.send(pollEmbed).then(messageReaction =>{messageReaction.react('👍'), messageReaction.react('👎')})
            message.delete();
        }
    }
}