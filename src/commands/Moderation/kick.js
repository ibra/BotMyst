import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "kick";
export const description = "Kicks the first mentioned user from the server";
export const usage = `${Prefix}kick @Noob#1234`;
export const category = "Moderation";

export async function execute(client, message, args) {
  message.mentions.members
    .first()
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
