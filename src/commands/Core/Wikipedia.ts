import { IBotMystClient } from "@typings/interfaces";
import { Colors } from "@utils/colors";
import { MessageEmbed } from "discord.js";
import ICommand from "@typings/interfaces/ICommand";
import wiki from "wikipedia";

const command: ICommand = {
  name: "wikipedia",
  description: "Search something on Wikipedia and get a short summary of it.",
  aliases: ["wiki"],
  category: "Core",
  usage: `wiki Lord Of The Rings [Gives A Short Summary from Wikipedia]`,

  run: async function (client: IBotMystClient, message: any, args: string[]) {
    const command = args.join(" ");

    if (!args[0]) {
      message.channel.send({
        embed: {
          color: Colors.RED,
          description: "Please provide a search term!",
        },
      });
    } else {
      let searchValue = command.toString().replace(/,/g, " ");
      let wikiEmbed = new MessageEmbed();

      (async () => {
        try {
          const summary = await wiki.summary(searchValue);

          try {
            wikiEmbed.setTitle(`Wikipedia >> ${summary.title}`);
            wikiEmbed.setThumbnail(summary.thumbnail.source);
            wikiEmbed.setDescription(summary.extract);
            wikiEmbed.setURL(summary.content_urls.desktop.page);
            wikiEmbed.setColor(Colors.ORANGE);
            message.channel.send({ embeds: [wikiEmbed] });
          } catch (error) {
            let embed = new MessageEmbed();
            embed.setColor(Colors.RED);
            embed.setDescription(`${error}`);
            embed.setTitle(`>Error 400`);
            embed.setFooter("Make sure you requested a valid page!");
            message.channel.send({ embeds: [embed] });
          }
        } catch (error) {
          let embed = new MessageEmbed();
          embed.setColor(Colors.RED);
          embed.setDescription(String(error));
          embed.setTitle(`>Error 429`);
          message.channel.send({ embeds: [embed] });
        }
      })();
    }
  },
};

export default command;
