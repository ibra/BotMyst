import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";
import { getUserMentioned } from "../../modules/mentioneduser.js";

export const name = "setnickname";
export const description =
  "Sets the mentioned users nickname to whatever argument is provided";
export const usage = `${Prefix}say Hello World!`;
export const permission = "Bot Owner";
export const category = "Admin";

export async function execute(client, message, args) {
  let nickname = args[0];
  let user = getUserMentioned();
  let embed = new MessageEmbed();

  if (
    message.guild.members.cache
      .get(client.user.id)
      .hasPermission("MANAGE_NICKNAMES") &&
    message.guild.members.cache
      .get(client.user.id)
      .hasPermission("CHANGE_NICKNAME")
  ) {
    embed.setColor(Colors.RED);
    embed.setTitle(">Error 400");
    embed.setDescription("I don't have permission to change nicknames!");
    message.channel.send(embed);
  } else {
    user.setNickname(nickname);
  }
}
