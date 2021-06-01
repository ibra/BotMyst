import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

import wiki from "wikijs";

export const name = "wikipedia";
export const description =
  "Search something on Wikipedia and get a short summary of it.";
export const aliases = ["wiki"];
export const usage = `${Prefix}wiki Lord Of The Rings [Gives A Short Summary from Wikipedia]"`;
export const category = "Core";

export async function execute(client, message, args) {
  const command = args.join(" ");

  let requestLang = "en"; // This is the Wikipedia language in which we send our request.
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
    console.log(searchValue);
    wiki()
      .page(searchValue)
      .then((page) => page.info("alterEgo"))
      .then(console.log);
  }
}
