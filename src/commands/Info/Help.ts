import { IBotMystClient } from "@typings/interfaces";
import ICommand from "@typings/interfaces/ICommand";
import { Colors } from "@utils/colors";
import { Message, MessageEmbed } from 'discord.js'

const command: ICommand = {
  name: "help",
  description: "Gives you a list of all the commands.",
  aliases: ["h"],
  usage: `help - info about all the commands\n help <command> - info about the specified command`,
  category: "Info",

  async run(client: IBotMystClient, message: Message, args: string[]) {
    if (args.length == 1) {
      printCommandHelp(client, message, args[0]);
    } else {
      printFullHelp(client, message);
    }
  },
};

function printCommandHelp(
  client: IBotMystClient,
  message: any,
  cmdSearch: string
) {
  const cmd =
    client.commands.get(cmdSearch.toLowerCase()) ||
    client.commands.find(
      (cmd) => !!cmd.aliases && cmd.aliases?.includes(cmdSearch.toLowerCase())
    );

  if (!cmd) {
    const embed = new MessageEmbed()
      .setColor(Colors.RED)
      .setDescription(`Command not found`);
    message.channel.send({ embeds: [embed] });
    return;
  }

  const embed = new MessageEmbed()
    .setColor(Colors.ORANGE)
    .setTitle(`BotMyst >> ${cmd.name}`);

  if (cmd!.description) embed.addField("Description", cmd!.description);
  if (cmd!.aliases) {
    embed.addField(
      "Aliases",
      Array.isArray(cmd!.aliases) ? cmd!.aliases.join(", ") : cmd!.aliases
    );
  }
  if (cmd!.category) embed.addField("Category", cmd!.category);
  if (cmd!.usage) embed.addField("Usage", cmd!.usage);

  message.channel.send({ embeds: [embed] });
}

function printFullHelp(client: IBotMystClient, message: any) {
  throw new Error("Function not implemented.");
}

export default command;
