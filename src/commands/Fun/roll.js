import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "roll";
export const description =
  "Rolls a number between 1 and the given number. <defaults to 10>";
export const usage = `${Prefix}roll 1 10`;
export const category = "Fun";

export async function execute(client, message, args) {
  const rollArgs = args.join(" ").split(" ");
  const min = 1;
  const max = parseInt(rollArgs[0]);

  const generatedNumber = getRandom(min, max, message);
  if (generatedNumber === undefined) return;

  // Setting successful embed values
  const roll = new MessageEmbed()
    .setDescription(`✅ Rolled: \`${generatedNumber} (Range ${min}-${max})\``)
    .setTimestamp(Date.now())
    .setColor(Colors.ORANGE);
  message.channel.send(roll);
}

function getRandom(minimum, maximum, message) {
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
      default:
        errorEmbed.setDescription("An unexpected error occured!");
        break;
    }

    message.channel.send(errorEmbed);
    return undefined;
  }

  return Math.floor(Math.random() * (maximum + 1));
}

function getErrorCode(minimum, maximum) {
  if (Number.isNaN(minimum) || Number.isNaN(maximum)) return 400;
  else if (minimum >= Number.MAX_VALUE || maximum >= Number.MAX_VALUE)
    return 429;

  return 0;
}
