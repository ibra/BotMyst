import { MessageEmbed } from "discord.js";
import { Author, Prefix } from "../../config.js";
import { Colors } from "../../colors.js";
import { enforcePermission } from "../../modules/enforce.js";

export const name = "say";
export const description = "A command that sends a user-sent message as a bot";
export const usage = `${Prefix}say Hello World!`;
export const permission = "Administrator";
export const category = "Administrator";

export async function execute(client, message, args) {
  if (!enforcePermission(message, permission)) return;
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
}
