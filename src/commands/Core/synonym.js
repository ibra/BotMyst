// import { MessageEmbed } from "discord.js";
// import Thesaurus from "thesaurus";
// import { Prefix } from "../../config.js";
// import { Colors } from "../../colors.js";

// export const name = "synonym";
// export const description = `${Prefix}Search something and get the synonyms of that word`;
// export const aliases = ["syn", "synonyms"];
// export const usage = "its like >dict but instead of meanings it gives synonyms";
// export const category = "Core";

// export async function execute(client, message, args) {
//   const wordLookup = args.join(" "); // Removing the Prefix from argument.
//   var res = Thesaurus.find(wordLookup); // Calling thesaurus.find, and passing our manipulated string as an argument.

//   let pages = res; // Assign our result to a variable
//   let page = 1; // the current page we are on.
//   const wordEmbed = new MessageEmbed() // Creating a new embed
//     .setColor(Colors.ORANGE)
//     .setTitle("Here are all synonyms for: " + wordLookup)
//   });
// }
