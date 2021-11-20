import { IBotMystClient } from "@typings/interfaces";
import { Colors } from "@utils/colors";
import { MessageEmbed } from "discord.js";
import ICommand from "@typings/interfaces/ICommand";

export const name = "kick";
export const description = "Kicks the first mentioned user from the server";
export const usage = `kick @Noob#1234`;
export const category = "Moderation";

const command: ICommand = {
  name: "kick",
  description: "Kicks mentioned user from the server",
  usage: "kick @UnepicGamer#0001",
  category: "Moderation",

  async run(client: IBotMystClient, message: any, args: string[]) {
    let member =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[0]).catch(() => {}));

    member
      .kick()
      .then((member: any) => {
        let successEmbed = new MessageEmbed();
        successEmbed.setTitle("Botmyst >> Kick");
        successEmbed.setDescription(`Successfully kicked ${member}!`);
        successEmbed.setColor(Colors.ORANGE);
        message.channel.send({ embeds: [successEmbed] });
      })
      .catch((error: any) => {
        let errorEmbed = new MessageEmbed();
        errorEmbed.setAuthor(`>Error 424`);
        errorEmbed.setDescription(String(error));
        errorEmbed.setColor(Colors.RED);
        message.channel.send({ embeds: [errorEmbed] });
      });
  },
};

export default command;
