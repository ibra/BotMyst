import { MessageEmbed } from "discord.js";
import { IBotMystClient } from "../types/interfaces";
import ICommand from "../types/interfaces/ICommand";
import { Colors } from "../utils/colors";

const command: ICommand = {
  name: "ping",
  description: "Pong!",
  aliases: ["pong"],
  category: "General",
  usage: "ping",

  async run(client: IBotMystClient, message: any, args: string[]) {
    const ping = new MessageEmbed();
    ping.setDescription(`🏓 Pong! Latency is about \`${client.ws.ping}\` ms`);
    ping.setTimestamp(Date.now());
    ping.setColor(Colors.ORANGE);

    message.channel.send(ping);
  },
};
export default command;
