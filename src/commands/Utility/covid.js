import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";
import { Prefix } from "../../config.js";
import { Colors } from "../../colors.js";

export const name = "covid";
export const description = "Track a country or worldwide COVID-19 cases";
export const aliases = ["cov", "covd"];
export const usage = `${Prefix}covid Canada - Returns Information About COVID-19 cases in Canada\n${Prefix}covid all - Returns Information for global stats`;
export const category = "Utility";

export async function execute(client, message, args) {
  const country = args[0];

  if (!args[0]) {
    const noArgs = new MessageEmbed()
      .setTitle("Error 400")
      .setColor(Colors.RED)
      .setDescription("You are missing some arguments!")
      .setFooter("ex: >covid all or >covid Canada");

    return message.channel.send(noArgs);
  }

  // If all arguments are provided, use the API to get the covid cases.
  if (args[0] === "all") {
    fetch("https://covid19.mathdro.id/api")
      .then((response) => response.json())
      .then((data) => {
        const confirmed = data.confirmed.value.toLocaleString();
        const recovered = data.recovered.value.toLocaleString();
        const deaths = data.deaths.value.toLocaleString();

        const embed = new MessageEmbed()
          .setTitle("Worldwide COVID-19 Stats 🌎")
          .setColor(Colors.ORANGE)
          .addField("Confirmed Cases", confirmed)
          .addField("Recovered", recovered)
          .addField("Deaths", deaths);

        message.channel.send(embed);
      });
  } else {
    fetch(`https://covid19.mathdro.id/api/countries/${country}`)
      .then((response) => response.json())
      .then((data) => {
        const confirmed = data.confirmed.value.toLocaleString();
        const recovered = data.recovered.value.toLocaleString();
        const deaths = data.deaths.value.toLocaleString();
        const embed = new MessageEmbed()
          .setTitle(`COVID-19 Stats for ${country}`)
          .addField("Confirmed Cases", confirmed)
          .addField("Recovered", recovered)
          .addField("Deaths", deaths)
          .setColor(Colors.ORANGE)
          .setTimestamp(Date.now());
        message.channel.send(embed);
      })
      .catch((e) => {
        const errorEmbed = new MessageEmbed()
          .setTitle(">Error 404")
          .setDescription("Couldnt find the country you provided!")
          .setFooter(
            "Check your spelling in case of an error, or make sure you are providing the name of a country!"
          )
          .setColor(Colors.RED);

        message.channel.send(errorEmbed);
      });
  }
}
