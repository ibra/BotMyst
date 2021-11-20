import { IBotMystClient } from "@typings/interfaces";
import { Colors } from "@utils/colors";
import { MessageEmbed, TextChannel } from "discord.js";
import ICommand from "@typings/interfaces/ICommand";

export const name = "say";
export const description = "A command that sends a user-sent message as a bot";
export const usage = `say #specified-channel Hello World!`;
export const permission = "Administrator";
export const category = "Administrator";

const command: ICommand = {
  name: "say",
  description: "A command that sends a user-sent message as a bot",
  aliases: ["echo"],
  category: "Administrator",
  usage: `say Hello World!`,

  async run(client: IBotMystClient, message: any, args: string[]) {
    var commandlessMessage = args.join(" ");
    var regex = /<#(\d+)>/g;
    commandlessMessage = commandlessMessage.replace(regex, "");

    if (message.mentions.channels.first()) {
      var channel = client.channels.cache.get(
        message.mentions.channels.first().id
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
