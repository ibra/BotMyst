import { Logger } from "@utils/Logger";
import { Interaction } from "discord.js";
import ICommand from "@typings/interfaces/ICommand";
import IEvent from "@typings/interfaces/IEvent";

const event: IEvent = {
  name: "interactionCreate",
  run: function (client, interaction: Interaction) {
    if (interaction.isCommand()) {
      const slashCommand = client.slashCommands.get(interaction.commandName);
      if (!slashCommand || !(slashCommand as ICommand)?.slashRun) return;

      try {
        (slashCommand as ICommand).slashRun!(client, interaction);
      } catch (err) {
        Logger.errorMessage("interaction appears to be invalid");
      }
    }
  },
};
export default event;
