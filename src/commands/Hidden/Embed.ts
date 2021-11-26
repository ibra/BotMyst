import { IBotMystClient } from "@typings/interfaces";
import { Colors } from "@utils/colors";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import ICommand from "@typings/interfaces/ICommand";

const regex = /(<#(?<channel>.*)>)?.*\[(?<title>.*)\].*\[(?<message>.*)\]/s;

const command: ICommand = {
  name: "embed",
  description: "A command that sends a message as an embed",
  aliases: ["echo"],
  category: "Administrator",
  usage: `embed <channel> [Hello!] [This is a test embed.]`,
  async run(client: IBotMystClient, message: Message, args: string[]) {
    let embed = new MessageEmbed();
    const argsJoined = args.join(" ");
    const match = argsJoined.match(regex);
    if (!match) {
      message.channel.send(
        `\`${message.author.tag}\`, the syntax is incorrect.\n\nUsage: ${this.usage}`
      );
      return;
    }
    if (match![0].match(/<#(?<channel>.*)>/)) {
      embed
        .setColor(Colors.ORANGE)
        .setTitle(match!.groups!.title)
        .setDescription(match!.groups!.message);

      var channel: TextChannel = client.channels.cache.get(
        match!.groups!.channel
      ) as TextChannel;
      channel!.send({ embeds: [embed] });
    } else if (
      match[0].match(/\[(?<title>.*)\]/) ||
      match[1]!.match(/\[(?<message>.*)\]/)
    ) {
      var channel: TextChannel = message.channel as TextChannel;
      embed
        .setColor(Colors.ORANGE)
        .setTitle(match!.groups!.title)
        .setDescription(match!.groups!.message);
      channel!.send({ embeds: [embed] });
    } else {
      message.channel.send(
        "Please use the following format: `embed <channel> [title] [message]`"
      );
    }
  },
};

export default command;
