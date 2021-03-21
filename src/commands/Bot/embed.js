import { MessageEmbed } from "discord.js";
import { Colors } from "../../colors.js";
import { Author, Prefix } from "../../config.js";

export const name = "embed";
export const description = "A command that sends a message as an embed";
export const usage = `${Prefix}embed [Hello!] [This is a test embed.]`;
export const permission = "Bot Owner";
export const category = "Bot";

export async function execute(client, message, args) {
    // Only allow the command to work if the author of the command is the bot author.
    if (message.author.id == Author) {
        sendEmbed(message);
    } else {
        let errorEmbed = new MessageEmbed()
            .setColor(Colors.RED)
            .setAuthor("> Error 403")
            .setDescription(
                `Only the BotAuthor (${Author})  can use this command!`
            );
        message.channel.send(errorEmbed);
    }
}

function sendEmbed(message) {
    let command = message.content;
    let channel = message.channel;

    // Some string manipulation that removes the square parenthesis to allow for both Titles and Descriptions
    let titleStart = command.indexOf("[");
    let titleEnd = command.indexOf("]");
    let title = command.substr(titleStart + 1, titleEnd - titleStart - 1);

    let descStart = command.indexOf("[", titleStart + 1);
    let descEnd = command.indexOf("]", titleEnd + 1);
    let description = command.substr(descStart + 1, descEnd - descStart - 1);

    let embed = new MessageEmbed();

    if (title === "" || description === "") {
        embed.setAuthor("> Error 400");
        embed.setDescription("You are missing arguments!");
        embed.setColor(Colors.RED);
        message.channel.send(embed);
    } else {
        embed.title = title;
        embed.description = description;
        embed.color = Colors.ORANGE;
    }

    channel.send(embed);
}
