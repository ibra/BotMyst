import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "dictionary";
export const description = "A command that shows the definition of a word";
export const aliases = ["dict"];
export const usage = `${Prefix}dict idiot [returns definition of word]`;
export const category = "Core";

export async function execute(client, message, args) {
  //Remove Prefix.
  const wordLookup = args.join(" ");
  //Create new embed.
  const dictionaryEmbed = new MessageEmbed();

  if (wordLookup == "") {
    dictionaryEmbed.setAuthor("> Error 400");
    dictionaryEmbed.setDescription("You havent provided any arguments!");
    dictionaryEmbed.setColor(Colors.RED);
    message.channel.send(dictionaryEmbed);
    return;
  }

  const requestURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const results = await fetch(`${requestURL}/${wordLookup}`);
  const json = await results.json();

  if (json[0] != null) {
    var phonetics = json[0].phonetics[0].text;
    var meaning = json[0].meanings[0].definitions[0].definition;
    var example = json[0].meanings[0].definitions[0].example;

    dictionaryEmbed.setAuthor(`${json[0].word} | ${phonetics}`);
    if (example != null) {
      dictionaryEmbed.setFooter("e.g: " + example);
    } else {
      dictionaryEmbed.setFooter("");
    }

    dictionaryEmbed.setDescription(meaning);
    dictionaryEmbed.setColor(Colors.ORANGE);
    message.channel.send(dictionaryEmbed);
  } else {
    dictionaryEmbed.setAuthor("> Error 404");
    dictionaryEmbed.setDescription("Sorry! I was unable to find that word.");
    dictionaryEmbed.setColor(Colors.RED);
    message.channel.send(dictionaryEmbed);
  }
}
