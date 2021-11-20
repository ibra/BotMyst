import { IBotMystClient } from "@typings/interfaces";
import ICommand from "@typings/interfaces/ICommand";
import { Colors } from "@utils/colors";
import { Logger } from "@utils/Logger";
import { Message, MessageEmbed } from "discord.js";

const command: ICommand = {
  name: "setnickname",
  description:
    "Sets the mentioned users nickname to whatever argument is provided",
  aliases: ["nick"],
  category: "Administrator",
  usage: `setnickname UnepicPerson`,

  async run(client: IBotMystClient, message: Message, args: string[]) {
    let embed = new MessageEmbed();
    let nickname = args[1];
    let user =
      message.mentions.members!.first() ||
      (await message.guild!.members.fetch(args[0]).catch(() => {}));

    user!.setNickname(nickname).catch((error) => {
      embed.setColor(Colors.RED);
      embed.setTitle(">An Error Occurred");
      embed.setDescription(String(error));
      Logger.errorMessage(error);
      message.channel.send({ embeds: [embed] });

      embed.setColor(Colors.ORANGE);
      if (user !== undefined)
        embed.setAuthor(`Set Nickname >> ${user.displayName}`);
    });
  },
};

export default command;
