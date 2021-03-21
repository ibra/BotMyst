import { MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "help";
export const description = "Gives you a list of all commands";
export const aliases = ["h"];
export const usage = `${Prefix}help [gives all commands] or >help [command] which gives info about the command`;
export const category = "Bot";

export async function execute(client, message, args) {
    if (args[0]) {
        return getCMD(client, message, args[0]);
    }
    else {
        return getAll(client, message, ">");
    }

    function getCMD(client, message, input) {
        const embed = new MessageEmbed();
        const cmd = client.commands.get(input.toLowerCase()) ||
            client.commands.get(client.aliases.get(input.toLowerCase()));
        console.log(input);
        let info = `No information found for command **${input.toLowerCase()}**`;
        if (!cmd) {
            return message.channel.send(embed.setDescription(info));
        }

        // Add all cmd info to the embed
        if (cmd.name) {
            info = `**Command name**: ${cmd.name}`;
        }
        if (cmd.aliases) {
            info += `\n**Aliases**: ${cmd.aliases
                .map((a) => `\`${a}\``)
                .join(", ")}`;
        }
        if (cmd.description) {
            info += `\n**Description**: ${cmd.description}`;
        }
        if (cmd.usage) {
            info += `\n**Usage**: ${cmd.usage}`;
        }

        return message.channel.send(
            embed
                .setAuthor(`BotMyst > ${cmd.name}`)
                .setColor(Colors.ORANGE)
                .setDescription(info)
        );
    }

    function getAll(client, message, Prefix) {
        const embed = new MessageEmbed().setColor(SuccessColor);

        const commands = (category) => {
            return client.commands
                .filter((cmd) => cmd.category === category)
                .map((cmd) => `\`${cmd.name}\``)
                .join(", ");
        };

        //Some string manipulation to format the Categories
        const info = client.categories
            .map(
                (cat) => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`
            )
            .reduce((string, category) => string + "\n" + category);

        return message.channel.send(
            embed
                .setTitle(`BotMyst > Help`)
                .setColor("ORANGE")
                .setDescription(
                    `Here are all of the commands for BotMyst, if you want more information about the command, do \`${Prefix}help [command]\` \n` +
                    info
                )
        );
    }
}
