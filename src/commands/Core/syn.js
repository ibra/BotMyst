import { MessageEmbed } from "discord.js";
import Thesaurus from "thesaurus";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "synonyms";
export const description = `${Prefix}Search something and get the synonyms of that word`;
export const aliases = ["syn"];
export const usage = "its like >dict but instead of meanings it gives synonyms";
export const category = "Core";

export async function execute(client, message, args) {
    const wordLookup = args.join(" "); // Removing the Prefix from argument.
    var res = Thesaurus.find(wordLookup); // Calling thesaurus.find, and passing our manipulated string as an argument.

    let pages = res; // Assign our result to a variable
    let page = 1; // the current page we are on.
    const wordEmbed = new MessageEmbed() // Creating a new embed
        .setColor(Colors.ORANGE)
        .setTitle("Here are all synonyms for: " + wordLookup)
        .setDescription(pages[page - 1])
        .setFooter(`Page ${page} of ${pages.length}`);
    // Send the embed and create a reaction collecter to listen for page changes.
    message.channel.send(wordEmbed).then((msg) => {
        msg.react("⬅️").then((r) => {
            msg.react("➡️");

            // Checking if the message author is reacting, these values are arguments for our reaction collecter.
            const backwardsReaction = (reaction, user) => reaction.emoji.name === "⬅️" && user.id === message.author.id;
            const forwardReaction = (reaction, user) => reaction.emoji.name === "➡️" && user.id === message.author.id;

            // Creating the actual reaction collecter
            const backwards = msg.createReactionCollector(backwardsReaction, {
                time: 500000,
            });
            const forwards = msg.createReactionCollector(forwardReaction, {
                time: 500000,
            });

            // check if there is a backward reaction collected.
            backwards.on("collect", (r) => {
                if (page === 1)
                    return;
                page--;
                wordEmbed.setDescription(pages[page - 1]);
                wordEmbed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(wordEmbed);
            });

            //check if there is a forward reaction collected.
            forwards.on("collect", (r) => {
                if (page === pages.length)
                    return;
                page++;
                wordEmbed.setDescription(pages[page - 1]);
                wordEmbed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(wordEmbed);
            });
        });
    });
}
