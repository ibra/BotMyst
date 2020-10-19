const pastemyst = require('pastemyst-js');
const Discord = require('discord.js');

module.exports = {
    name: "pastemyst",
    description: "Pastes a block of text onto paste.myst.rs, and sends the link.",
    aliases: ['paste', 'pm'],

    execute: async function (client, message, args) {
        if (!args[0]) return message.channel.send('Please provide the code you\'d like me to paste!')
        else {
           pastemyst.createPasteMyst(args.join(' '), 'never', 'autodetect')
             .then((pasteMystInfo) => {
                 const pasteEmbed = new Discord.MessageEmbed()
                 .setColor('#FFA110')
                 .setTitle(`Codeblock pasted onto PasteMyst by ${message.author.username}!`)
                 .addField('Link', pasteMystInfo.link)
                 .setAuthor(message.author.username)
                 message.channel.send(pasteEmbed)
                // message.channel.send(`Codeblock pasted by ${message.author}! - ${pasteMystInfo.link}`);
                message.delete()
             })
        }
    }
}