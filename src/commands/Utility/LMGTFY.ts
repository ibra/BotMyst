import { MessageEmbed } from "discord.js";
import { Colors } from "../../utils/colors";
import ICommand from "../../types/interfaces/ICommand.js";
import { IBotMystClient } from "../../types/interfaces";

const command: ICommand = {
  name: "lmgtfy",
  description:
    "Gives idiots a link to click to search stuff on google since people are too lazy to do it themselves.",
  aliases: ["lmgt"],
  category: "Utility",
  usage: "lmgtfy [query]",

  async run(client: IBotMystClient, message: any, args: string[]) {
    const search = args.join(" ");
    var replaced = search.split(" ").join("+");

    const lmgtfyEmbed = new MessageEmbed()
      .setTitle("Heres what i could find for: " + search)
      .setURL("https://lmgtfy.com/?q=" + replaced)
      .setColor(Colors.ORANGE);

    message.channel.send({ embeds: [lmgtfyEmbed] });
  },
};
export default command;
