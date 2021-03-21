import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";
import { readFileSync } from "fs";

export const name = "info";
export const description = "A command that shows some info about the bot.";
export const aliases = ["about"];
export const usage = `${Prefix}info [Displays Information about bot]`;
export const category = "Bot";

export async function execute(client, message, args) {
    //Create an embed with info about the bot.
    const embed = new MessageEmbed();
    embed.setAuthor("BotMyst > About");
    embed.setDescription(
        "BotMyst is a general-purpose utility bot currently written by [IbrahimDev](https://github.com/ibra) and [CodeMyst](https://github.com/CodeMyst)."
    );
    // todo: versioning
    embed.addField("Version", "1.0.0");

    //Get version of Discord.JS Package
    const json = JSON.parse(readFileSync("node_modules/discord.js/package.json"));
    const discordVersion = json.version;

    //Add other information such as the latency, and the bots current prefix.
    embed.addField("Discord.JS Version", discordVersion);
    embed.addField("Latency", `\`${client.ws.ping}\` ms`);
    embed.addField("Prefix", `\`${Prefix}\``);
    embed.setColor(Colors.ORANGE);
    embed.setThumbnail("https://i.ibb.co/nsbPyPR/botmyst.png");

    message.channel.send(embed);
}
