import { MessageEmbed } from "discord.js";
import { Colors } from "../../utils/colors";
import { IBotMystClient } from "../../types/interfaces/IBotMystClient";
import fetch from "node-fetch";
import ICommand from "../../types/interfaces/ICommand.js";

const command: ICommand = {
  name: "insult",
  description: "States a random insult.",
  aliases: ["roast"],
  category: "Fun",
  usage: "insult",

  async run(client: IBotMystClient, message: any, args: string[]) {
    const insultEmbed = new MessageEmbed();

    fetch("https://insult.mattbas.org/api/insult.json")
      .then((response) => response.json())
      .then((data) => {
        insultEmbed.setDescription(data.insult).setColor(Colors.ORANGE);
        message.channel.send({ embeds: [insultEmbed] });
      })
      .catch((error) => {
        insultEmbed
          .setDescription("An unexpected error ocurred!")
          .setFooter(`Info: ${error}`)
          .setColor(Colors.RED);
        message.channel.send({ embeds: [insultEmbed] });
      });
  },
};
export default command;
