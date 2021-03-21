import { MessageEmbed } from 'discord.js';
import { Prefix } from '../../config.js';
import { Colors } from "../../colors.js";

export const name = "avatar";
export const description = "Returns mentioned user's avatar and returns your avatar if there are no arguments";
export const aliases = ['av'];
export const usage = `${Prefix}avatar @User#001 [Returns Their Avatar]`;
export const category = "Utility";

export async function execute(client, message, args) {
    // Create new message Embed 
    const avatarEmbed = new MessageEmbed();

    // If there is no mention, then display Author's avatar.
    if (!message.mentions.users.first()) {
        avatarEmbed.setTitle(`${user.username}'s avatar!`);
        avatarEmbed.setColor(Colors.ORANGE);
        avatarEmbed.setImage(message.author.displayAvatarURL());
    } // Otherwise, we display the mentioned users avatar.
    else {
        const user = message.mentions.users.first();
        avatarEmbed.setTitle(`${user.username}'s avatar!`);
        avatarEmbed.setColor(Colors.ORANGE);
        avatarEmbed.setImage(user.displayAvatarURL());
    }

    message.channel.send(avatarEmbed);
}
