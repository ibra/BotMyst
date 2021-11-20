import { MessageEmbed } from "discord.js";
import { Colors } from "@utils/colors";
import { IBotMystClient } from "@typings/interfaces/IBotMystClient";
import ICommand from "@typings/interfaces/ICommand.js";

const command: ICommand = {
  name: "info",
  description: "Shows some info about the bot.",
  aliases: ["about"],
  category: "Info",
  usage: "info",

  async run(client: IBotMystClient, message: any, args: string[]) {
    const embed = new MessageEmbed();
    embed.setAuthor("BotMyst >> Info");
    embed.setDescription(
      "BotMyst is a general-purpose utility bot currently written by [IbrahimDev](https://github.com/ibra) and originally created by [CodeMyst](https://github.com/CodeMyst)."
    );

    embed.addField(
      "API Latency",
      `\`${Math.round(message.client.ws.ping)}\` ms`
    );
    embed.addField("Server Prefix", `>`);
    embed.setColor(Colors.ORANGE);
    embed.setThumbnail("https://i.ibb.co/nsbPyPR/botmyst.png");

    message.channel.send({ embeds: [embed] });
  },
};
export default command;
