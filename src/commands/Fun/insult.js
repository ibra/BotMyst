import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";
import fetch from "node-fetch";

export const name = "insult";
export const description = "States a random insult.";
export const usage = `${Prefix}insult`;
export const aliases = ["roast"];
export const category = "Fun";

export async function execute(client, message, args) {
  const insultEmbed = new MessageEmbed();

  fetch("https://insult.mattbas.org/api/insult.json")
    .then((response) => response.json())
    .then((data) => {
      // Setting Embed Values
      insultEmbed.setDescription(data.insult).setColor(Colors.ORANGE);
      message.channel.send(insultEmbed);
    })
    .catch((error) => {
      insultEmbed
        .setDescription("An unexpected error ocurred!")
        .setFooter(`Info: ${error}`)
        .setTimestamp(Date.now())
        .setColor(Colors.RED);
      message.channel.send(insultEmbed);
    });
}
