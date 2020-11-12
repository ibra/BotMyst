const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Returns metioned users avatar and returns your avatar if there are no arguments",
    aliases: ['av'],
    usage: ">avatar @User#001 [Returns Their Avatar]",

    execute: async function(client, message, args) {

        //Create new message Embed 
        const avatarEmbed = new Discord.MessageEmbed();

        //If there is no mention, then display Author's avatar.
        if (!message.mentions.users.first()) {
            avatarEmbed.setTitle(message.author.username);
            avatarEmbed.setColor(3066993);
            avatarEmbed.setAuthor("Your Avatar!");
            avatarEmbed.setImage(message.author.displayAvatarURL());
        } //Otherwise, we display the mentioned users avatar.
        else {
            const user = message.mentions.users.first();
            avatarEmbed.setTitle(`${user.username}'s avatar!`);
            avatarEmbed.setColor(3066993);
            avatarEmbed.setImage(user.displayAvatarURL());

        }
        //Send the embed.
        message.channel.send(avatarEmbed);
    }


}