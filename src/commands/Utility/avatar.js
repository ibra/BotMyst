import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";
import { getUserByMention } from "../../modules/mentionedUser.js";

export const name = "avatar";
export const description =
  "Returns mentioned user's avatar and returns your avatar if there are no arguments";
export const aliases = ["av"];
export const usage = `${Prefix}avatar @User#001 - Returns Their Avatar`;
export const category = "Utility";

export async function execute(client, message, args) {
  const avatarEmbed = new MessageEmbed();

  let user = getUserByMention(message);

  avatarEmbed.setTitle(`${user.username}'s avatar!`);
  avatarEmbed.setColor(Colors.ORANGE);
  avatarEmbed.setImage(user.displayAvatarURL());

  message.channel.send(avatarEmbed);
}
