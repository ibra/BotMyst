import { MessageEmbed } from "discord.js";
import { IBotMystClient } from "../../types/interfaces";
import { Colors } from "../../utils/colors";
import ICommand from "../../types/interfaces/ICommand";

const command: ICommand = {
  name: "ping",
  description: "Pong!",
  aliases: ["pong"],
  category: "General",
  usage: "ping",

  async run(client: IBotMystClient, message: any, args: string[]) {
    const pingEmbed = new MessageEmbed();
    pingEmbed.setDescription(
      `🏓 Pong! Latency is about \`${client.ws.ping}\` ms`
    );
    pingEmbed.setColor(Colors.ORANGE);

    message.channel.send({ embeds: [pingEmbed] });
  },
};
export default command;
