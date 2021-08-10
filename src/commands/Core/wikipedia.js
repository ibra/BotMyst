import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";
import { MessageEmbed } from "discord.js";

import wiki from "wikipedia";

export const name = "wikipedia";
export const description =
  "Search something on Wikipedia and get a short summary of it.";
export const aliases = ["wiki"];
export const usage = `${Prefix}wiki Lord Of The Rings [Gives A Short Summary from Wikipedia]"`;
export const category = "Core";

export async function execute(client, message, args) {
  const command = args.join(" ");

  if (!args[0]) {
    message.channel.send({
      embed: {
        color: Colors.RED,
        description: "The command you gave was invalid or doesnt exist",
      },
    });
  } else {
    // Using some regex to make the string understandable to the getWikipediaShortSummary() function.
    let searchValue = command.toString().replace(/,/g, " ");
    let wikiEmbed = new MessageEmbed();

    (async () => {
      try {
        const summary = await wiki.summary(searchValue);

        try {
          wikiEmbed.setTitle(`Wikipedia > ${summary.title}`);
          wikiEmbed.setThumbnail(summary.thumbnail.source);
          wikiEmbed.setDescription(summary.extract);
          wikiEmbed.setURL(summary.content_urls.desktop.page);
          wikiEmbed.setColor(Colors.ORANGE);
          message.channel.send(wikiEmbed);
        } catch (error) {
          let embed = new MessageEmbed();
          embed.setColor(Colors.RED);
          embed.setDescription(`${error}`);
          embed.setTitle(`>Error 400`);
          embed.setFooter("Make sure you requested a valid page!");
          message.channel.send(embed);
        }
      } catch (error) {
        let embed = new MessageEmbed();
        embed.setColor(Colors.RED);
        embed.setDescription(error);
        embed.setTitle(`>Error 429`);
        message.channel.send(embed);
      }
    })();
  }
}
