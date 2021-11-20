import { Message, MessageEmbed } from 'discord.js'
import { IBotMystClient } from "@typings/interfaces";
import ICommand from "@typings/interfaces/ICommand";
import { Colors } from "@utils/colors.js";

const command: ICommand = {
  name: "avatar",
  description:
    "Returns mentioned user's avatar and returns your avatar if there are no arguments",
  aliases: ["av"],
  category: "Utility",
  usage: "insult",

  async run(client: IBotMystClient, message: Message, args: string[]) {
    const avatarEmbed = new MessageEmbed();
    let member =
      message.mentions.members!.first() ||
      (await message.guild!.members.fetch(args[0]).catch(() => {}));

    if (!member) {
      member = message.member ?? await message.guild!.members.fetch(message.author.id);
    }
    avatarEmbed.setColor(Colors.ORANGE);
    avatarEmbed.setImage(member.displayAvatarURL());
    avatarEmbed.setTitle(`Avatar >> ${member.user.tag}`);

    message.channel.send({ embeds: [avatarEmbed] });
  },
};

export default command;
