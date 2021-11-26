import { IBotMystClient } from "@typings/interfaces";
import { Colors } from "@utils/colors";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import ICommand from "@typings/interfaces/ICommand";

const channelRegex = /<#(\d+)>/g;

const command: ICommand = {
  name: "say",
  description: "A command that sends a user-sent message as a bot",
  aliases: ["echo"],
  category: "Administrator",
  usage: `say Hello World!`,

  async run(client: IBotMystClient, message: Message, args: string[]) {
    var commandlessMessage = args.join(" ");
    commandlessMessage = commandlessMessage.replace(channelRegex, "");

    if (message.mentions.channels.first()) {
      var channel = client.channels.cache.get(
        message.mentions.channels.first()!.id
      ) as TextChannel;

      channel.send(commandlessMessage).catch((error: any) => {
        let errorEmbed = new MessageEmbed();
        errorEmbed
          .setColor(Colors.RED)
          .setAuthor(">An Error Occurred")
          .setDescription(String(error));
        message.channel.send({ embeds: [errorEmbed] });
      });
    }
  },
};

export default command;
