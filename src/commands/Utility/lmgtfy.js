import { MessageEmbed } from "discord.js";
import { Prefix } from '../../config.js';
import { Colors } from "../../colors.js";

export const name = "lmgtfy";
export const description = "Gives idiots a link to click to search stuff on google since people are too lazy to do it themselves.";
export const aliases = ['lmgt'];
export const category = "Utility";
export const usage = `${Prefix}lmgtfy How to make a discord bot`;

export async function execute(client, message, args) {
    //M anipulate string so it can be placed in middle of URL
    const search = args.join(" ");
    var replaced = search.split(' ').join('+');

    // Make an embed and set the Title URL to https://lmgtfy.com + our manipulated string.
    const lmgtfyEmbed = new MessageEmbed()
        .setTitle("Heres what i could find for: " + search)
        .setURL('https://lmgtfy.com/?q=' + replaced)
        .setTimestamp(Date.now())
        .setColor(Colors.ORANGE);

    message.channel.send(lmgtfyEmbed);
}
