import { MessageEmbed } from "discord.js";
import { Colors } from "../colors.js";
import { Author } from "../config.js";

export function enforcePermission(message, permission) {
  if (permission == "BOT_AUTHOR") return message.author.id === Author.id;
  let check = message.member.hasPermission(permission);

  if (!check) {
    let embed = new MessageEmbed()
      .setColor(Colors.RED)
      .setTitle(">Error 403")
      .setDescription(
        `Only a user with the ${permission} permission can run this command!`
      );

    message.channel.send(embed);
  }

  return check;
}

export function enforceParams(msg, predicate, usage) {
  if (!predicate) {
    let embed = new MessageEmbed()
      .setColor(Colors.RED)
      .setTitle("Invalid command parameters")
      .setDescription(`Usage: ${usage}`);
    msg.channel.send(embed);
  }

  return predicate;
}
