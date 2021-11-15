import { MessageEmbed } from "discord.js";
import { Colors } from "@utils/colors";
import { IBotMystClient } from "@typings/interfaces";
import ICommand from "@typings/interfaces/ICommand.js";

const command: ICommand = {
  name: "roll",
  description:
    "Rolls a number between 1 and the given number. <defaults to 10>",
  aliases: ["dice"],
  category: "Fun",
  usage: "roll 1-10",

  async run(client: IBotMystClient, message: any, args: string[]) {
    const rollArgs = args[0].split("-");
    const min = parseInt(rollArgs[0]);
    const max = parseInt(rollArgs[1]);

    const generatedNumber = getRandom(min, max, message);
    if (generatedNumber === undefined) return;

    const rollEmbed = new MessageEmbed()
      .setDescription(`✅ Rolled: \`${generatedNumber} (Range ${min}-${max})\``)
      .setColor(Colors.ORANGE);
    message.channel.send({ embeds: [rollEmbed] });
  },
};

function getRandom(minimum: number, maximum: number, message: any) {
  const errorCode = getErrorCode(minimum, maximum);
  if (errorCode !== 0) {
    const errorEmbed = new MessageEmbed()
      .setColor(Colors.RED)
      .setAuthor(`> Error ${errorCode}`);

    switch (errorCode) {
      case 400:
        errorEmbed.setDescription(
          "Expected all arguments to be numbers (got NaN)!"
        );
        break;

      case 429:
        errorEmbed.setDescription(
          "The value(s) you have provided are too large!"
        );
        break;
      case 430:
        errorEmbed.setDescription("Maximum can not be larger than minimum!");
        break;
      default:
        errorEmbed.setDescription("An unexpected error occured!");
        break;
    }
    message.channel.send({ embeds: [errorEmbed] });
    return undefined;
  }
  minimum = Math.ceil(minimum);
  maximum = Math.floor(maximum);
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getErrorCode(minimum: number, maximum: number) {
  if (maximum < minimum) return 430;
  if (Number.isNaN(minimum) || Number.isNaN(maximum)) return 400;
  else if (minimum >= Number.MAX_VALUE || maximum >= Number.MAX_VALUE)
    return 429;
  return 0;
}

export default command;
