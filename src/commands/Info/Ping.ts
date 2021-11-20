import { MessageEmbed } from "discord.js";
import { IBotMystClient } from "@typings/interfaces";
import { Colors } from "@utils/colors";
import ICommand from "@typings/interfaces/ICommand";

const command: ICommand = {
  name: "ping",
  description: "Return the API latency of the bot.",
  category: "General",
  usage: "ping",

  async run(client: IBotMystClient, message: any, args: string[]) {
    const pingEmbed = new MessageEmbed();
    pingEmbed.setDescription(
      `🏓 Pong >> Latency is about \`${client.ws.ping}\` ms`
    );
    pingEmbed.setColor(Colors.ORANGE);

    message.channel.send({ embeds: [pingEmbed] });
  },
};
export default command;
