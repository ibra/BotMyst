import { IBotMystClient } from "@typings/interfaces";
import ICommand from "@typings/interfaces/ICommand";
import { Logger } from "@utils/Logger";
import { Message } from "discord.js";

export const name = "synonym";
export const description = `Search something and get the synonyms of that word`;
export const aliases = ["syn", "synonyms"];
export const usage = "its like >dict but instead of meanings it gives synonyms";
export const category = "Core";

const command: ICommand = {
  name: "synonym",
  description: "Search something and get the synonyms of that word",
  aliases: ["syn", "synonyms"],
  category: "Core",
  usage: "Returns similar words of a given word",

  async run(client: IBotMystClient, message: Message, args: string[]) {
    const wordLookup = args.join(" ");
    fetch(`https://example.com`)
      .then((response) => response.json())
      .then((data) => {
        Logger.warn(`Command ${name} not implemented yet!`);
      });
  },
};

export default command;
