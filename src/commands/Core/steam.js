import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";
import fetch from "node-fetch";

export const name = "steam";
export const description = "Tries searching for a game on Steam.";
export const usage = `${Prefix}steam`;
export const aliases = ["stsrch", "st"];
export const category = "Core";

export async function execute(client, message, args) {
  const searchEmbed = new MessageEmbed();
  const search = args[0];
  if (args[0] === "") return;

  fetch(
    `https://store.steampowered.com/api/storesearch/?term={${search}}&l=english&cc=US`
  )
    .then((response) => response.json())
    .then((data) => {
      let mainItem = data.items[0];

      searchEmbed.setTitle(`${mainItem.name} | ${mainItem.id}`);
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
          : `${(mainItem.price.final / 100).toString()} ${
              mainItem.price.currency
            }`;

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

      message.channel.send(searchEmbed);
    })
    .catch((error) => {
      searchEmbed
        .setDescription("An unexpected error ocurred!")
        .setFooter(`Info: ${error}`)
        .setTimestamp(Date.now())
        .setColor(Colors.RED);
      message.channel.send(searchEmbed);
    });
}

function getSupportedEmoji(condiition) {
  if (condiition === true || condiition === "true") return "✅";
  else return "❌";
}
