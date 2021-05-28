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
      let index = 0;
      setEmbedValues(index, data, searchEmbed);

      message.channel.send(searchEmbed).then((msg) => {
        msg.react("⬅️").then((r) => {
          msg.react("➡️");

          // Checking if the message author is reacting, these values are arguments for our reaction collecter.
          const backwardsReaction = (reaction, user) =>
            reaction.emoji.name === "⬅️" && user.id === message.author.id;
          const forwardReaction = (reaction, user) =>
            reaction.emoji.name === "➡️" && user.id === message.author.id;

          // Creating the actual reaction collecter
          const backwards = msg.createReactionCollector(backwardsReaction, {
            time: 500000,
          });
          const forwards = msg.createReactionCollector(forwardReaction, {
            time: 500000,
          });

          backwards.on("collect", (r) => {
            if (index === 0) return;
            index--;
            searchEmbed.fields = [];
            setEmbedValues(index, data, searchEmbed);
            msg.edit(searchEmbed);
          });

          forwards.on("collect", (r) => {
            if (index === index.length - 1) return;
            index++;
            searchEmbed.fields = [];
            setEmbedValues(index, data, searchEmbed);
            msg.edit(searchEmbed);
          });
        });
      });
    });
}

function setEmbedValues(index, data, searchEmbed) {
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

function getSupportedEmoji(condition) {
  if (condition === true || condition === "true") return "✅";
  else return "❌";
}
