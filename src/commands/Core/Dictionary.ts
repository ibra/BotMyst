import { MessageEmbed } from "discord.js";
import { Colors } from "@utils/colors";
import { IBotMystClient } from "@typings/interfaces";
import fetch from "node-fetch";
import ICommand from "@typings/interfaces/ICommand.js";

const command: ICommand = {
  name: "dictionary",
  description: "A command that shows the definition of a word",
  aliases: ["dict"],
  usage: `dict idiot [returns definition of word]`,
  category: "Core",
  run: async function (client: IBotMystClient, message: any, args: string[]) {
    const wordLookup = args.join(" ");
    const dictionaryEmbed = new MessageEmbed();

    if (wordLookup == "") {
      dictionaryEmbed.setAuthor("> Error 400");
      dictionaryEmbed.setDescription("You havent provided any arguments!");
      dictionaryEmbed.setColor(Colors.RED);
      message.channel.send({ embeds: [dictionaryEmbed] });
      return;
    }

    const requestURL = "https://api.dictionaryapi.dev/api/v2/entries/en";
    const results = await fetch(`${requestURL}/${wordLookup}`);
    const json = await results.json();

    if (json[0] != null) {
      var phonetics = json[0].phonetics[0].text;
      var meaning = json[0].meanings[0].definitions[0].definition;
      var example = json[0].meanings[0].definitions[0].example;

      dictionaryEmbed.setAuthor(`${json[0].word} >> ${phonetics}`);
      if (example != null) dictionaryEmbed.setFooter("e.g: " + example);

      dictionaryEmbed.setDescription(meaning);
      dictionaryEmbed.setColor(Colors.ORANGE);
      message.channel.send({ embeds: [dictionaryEmbed] });
    } else {
      dictionaryEmbed.setAuthor("> Error 404");
      dictionaryEmbed.setDescription("Sorry! I was unable to find that word.");
      dictionaryEmbed.setColor(Colors.RED);
      message.channel.send({ embeds: [dictionaryEmbed] });
    }
  },
};

export default command;
