import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "ping";
export const description = "Returns the bot latency.";
export const usage = `${Prefix}ping [Gets Latency]`;
export const category = "Bot";

export async function execute(client, message, args) {
    const ping = new MessageEmbed();

    //Setting Embed Values
    ping.setDescription(`🏓 Pong! Latency is about \`${client.ws.ping}\` ms`);
    ping.setTimestamp(Date.now());
    ping.setColor(Colors.ORANGE);

    message.channel.send(ping);
}
