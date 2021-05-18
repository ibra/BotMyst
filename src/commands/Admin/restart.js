import { MessageEmbed } from "discord.js";
import { Colors } from "../../colors.js";
import { Prefix, Token } from "../../config.js";
import { enforceAdmin } from "../../modules/enforce.js";

export const name = "restart";
export const description = "Restarts the bot.";
export const usage = `${Prefix}restart`;
export const permission = "Admin";
export const category = "Admin";

export async function execute(client, message, args) {
  if (!enforceAdmin(message)) return;

  let embed = new MessageEmbed()
    .setColor(Colors.ORANGE)
    .setTitle("Restarting...")
    .setDescription("This could take a while...");

  message.channel.send(embed).then((msg) => {
    client.destroy(), client.login(Token);
    embed.setTitle("Success!").setDescription("Bot Restarted Successfully!"),
      setTimeout(function () {
        msg.edit(embed);
      }, 1000);
  });
}
