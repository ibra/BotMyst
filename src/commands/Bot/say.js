import { MessageEmbed } from "discord.js";
import { Author, Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "say";
export const description = "A command that sends a user-sent message as a bot";
export const usage = `${Prefix}say Hello World!`;
export const permission = "Bot Owner";
export const category = "Bot";

export async function execute(client, message, args) {
    //Only allow the command to work if the author of the command is the bot author.
    if (message.author.id == Author) {
        const commandlessMessage = args.join(" ");
        if (message.mentions.channels.first()) {
            client.channels.cache
                .get(message.mentions.channels.first().id)
                .send(commandlessMessage)
                .catch((error) => {
                    let errorEmbed = new MessageEmbed();
                    if (error.code == 50001) {
                        errorEmbed
                            .setColor(Colors.RED)
                            .setAuthor("> Error 403")
                            .setDescription("I was unable to access this channel.");
                    }

                    message.channel.send(errorEmbed);
                });
        }
        else {
            message.channel.send(commandlessMessage);
        }
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
