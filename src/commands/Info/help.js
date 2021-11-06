import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "help";
export const description = "Gives you a list of all the commands.";
export const aliases = ["h"];
export const usage = `${Prefix}help - info about all the commands\n${Prefix}help <command> - info about the specified command`;
export const category = "Info";

export async function execute(client, message, args) {
  if (args.length == 1) {
    printCommandHelp(client, message, args[0]);
  } else {
    printFullHelp(client, message);
  }
}

function printCommandHelp(client, message, cmdSearch) {
  const cmd =
    client.commands.get(cmdSearch.toLowerCase()) ||
    client.commands.get(client.aliases.get(cmdSearch.toLowerCase()));

  if (!cmd) {
    const embed = new MessageEmbed()
      .setColor(Colors.RED)
      .setDescription(`Command not found`);
    message.channel.send(embed);
    return;
  }

  const embed = new MessageEmbed()
    .setColor(Colors.ORANGE)
    .setTitle("BotMyst Help");

  embed.addField("Command", cmd.name, true);
  embed.addField("Aliases", cmd.aliases.join(", "), true);
  embed.addField("Description", cmd.description);
  embed.addField("Usage", cmd.usage);

  message.channel.send(embed);
}

function printFullHelp(client, message) {
  let embed = new MessageEmbed()
    .setColor(Colors.ORANGE)
    .setTitle("BotMyst > Help")
    .setDescription(
      `To get info about a specific command, run \`${Prefix}help <command>\`.`
    );

  for (let cat of client.categories) {
    if (cat === "Hidden") continue;

    const commands = client.commands.filter((c) => c.category == cat);
    embed.addField(cat, commands.map((c) => `\`${c.name}\``).join(", "));
  }

  message.channel.send(embed);
}
