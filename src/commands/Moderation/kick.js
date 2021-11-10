import { Prefix } from "../../config.js";
import { MessageEmbed } from "discord.js";
import { Colors } from "../../colors.js";
import { enforcePermission } from "../../modules/enforce.js";

export const name = "kick";
export const description = "Kicks the first mentioned user from the server";
export const usage = `${Prefix}kick @Noob#1234`;
export const category = "Moderation";

export async function execute(client, message, args) {
  if (!enforcePermission(message.member, "KICK_MEMBERS")) return;

  let member =
    message.mentions.members.first() ||
    (await message.guild.members.fetch(args[0]).catch(() => {}));

  member
    .kick()
    .then((member) => {
      let successEmbed = new MessageEmbed();
      successEmbed.setTitle("Botmyst > Kick");
      successEmbed.setDescription(`Successfully kicked ${member}!`);
      successEmbed.setColor(Colors.ORANGE);
      message.channel.send(successEmbed);
    })
    .catch((error) => {
      let errorEmbed = new MessageEmbed();
      errorEmbed.setTitle(`>Error 424`);
      errorEmbed.setDescription(error);
      errorEmbed.setColor(Colors.RED);
      message.channel.send(errorEmbed);
    });
}
