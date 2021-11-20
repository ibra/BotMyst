import { IBotMystClient } from "@typings/interfaces";
import { MessageEmbed } from "discord.js";
import ICommand from "@typings/interfaces/ICommand";
import { Colors } from "@utils/colors";
import fetch from "node-fetch";

const command: ICommand = {
  name: "steam",
  description: "Tries searching for a game on Steam.",
  aliases: ["stsrch", "st"],
  category: "Core",
  usage: "steam",

  async run(client: IBotMystClient, message: any, args: string[]) {
    const searchEmbed = new MessageEmbed();
    const search = args[0];

    if (args[0] === "") return;

    fetch(
      `https://store.steampowered.com/api/storesearch/?term={${search}}&l=english&cc=US`
    )
      .then((response) => response.json())
      .then((data) => {
        let index = 0;
        setEmbedValues(index, data, searchEmbed);
        message.channel.send({ embeds: [searchEmbed] });
      });
  },
};

function setEmbedValues(
  index: number,
  data: { items: any[] },
  searchEmbed: MessageEmbed
) {
  let mainItem = data.items[index];

  searchEmbed.setTitle(`${mainItem.name} | ${mainItem.id}`);
  searchEmbed.setURL(`https://store.steampowered.com/app/${mainItem.id}`);
  searchEmbed.setColor(Colors.ORANGE);
  searchEmbed.setImage(mainItem.tiny_image);

  let metaScore =
    mainItem.metascore === undefined || mainItem.metascore === ""
      ? "Unrated"
      : mainItem.metascore.toString();

  let controllerSupport =
    mainItem.controller_support === undefined
      ? "Not Specified"
      : mainItem.controller_support;

  let price =
    mainItem.price === undefined
      ? "Free"
      : `${(mainItem.price.final / 100).toString()} ${mainItem.price.currency}`;

  searchEmbed.addFields(
    {
      name: "💯 Metascore",
      value: metaScore,
      inline: true,
    },
    {
      name: "🎮 Controller Support",
      value: controllerSupport,
      inline: true,
    },
    {
      name: "💸 Current Price",
      value: price,
      inline: true,
    },
    {
      name: "Windows Support:",
      value: getSupportedEmoji(mainItem.platforms.windows),
      inline: true,
    },
    {
      name: "Mac Support:",
      value: getSupportedEmoji(mainItem.platforms.mac),
      inline: true,
    },
    {
      name: "Linux Support:",
      value: getSupportedEmoji(mainItem.platforms.linux),
      inline: true,
    }
  );
  searchEmbed.setFooter(`Item ${index + 1} of ${data.items.length}`);
}

function getSupportedEmoji(condition: string | boolean) {
  if (condition === true || condition === "true") return "✅";
  else return "❌";
}

export default command;
