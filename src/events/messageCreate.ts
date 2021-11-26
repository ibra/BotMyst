import { Message, MessageEmbed } from "discord.js";
import IEvent from "@typings/interfaces/IEvent";
import { Logger } from "@utils/Logger";

const event: IEvent = {
  name: "messageCreate",
  async run(client, message: Message) {
    if (message.author.bot) return;
    let prefix = process.env.PREFIX as string;
    if (!message.content.startsWith(prefix)) return;

    if (!message.guild)
      return message.channel.send(
        "Hey! At the time being, you can only run commands in servers! Sorry!"
      );

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()!?.toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) =>
          !!cmd.aliases &&
          (typeof cmd.aliases === "string"
            ? commandName === cmd.aliases
            : cmd.aliases.includes(commandName))
      );

    if (!command) return;

    try {
      command.run(client, message, args);
    } catch (err) {
      Logger.errorMessage(
        `\nThere was an error running the command ${command.name}!\nError: ${err}`
      );

      const errEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("Error")
        .setDescription(
          `Something went wrong... This isn't usually supposed to happen.`
        );

      message.channel.send({ embeds: [errEmbed] });
    }
  },
};

export default event;
