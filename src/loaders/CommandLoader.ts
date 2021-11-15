import { join } from "path";
import { readdirSync } from "fs";
import { IBotMystClient } from "../types/interfaces/IBotMystClient";
import { Logger } from "@utils/Logger";
import ICommand from "@typings/interfaces/ICommand";

export class CommandLoader {
  public loadCommands(client: IBotMystClient): void {
    for (const folder of client.categories) {
      Logger.info(folder);
      if (folder === "context") continue;

      const commandFiles = readdirSync(
        join(__dirname, `../commands/${folder}`)
      ).filter((file: string) => file.endsWith(".js") || file.endsWith("ts"));

      for (const file of commandFiles) {
        const req = require(`../commands/${folder}/${file}`);
        const command: ICommand = req.default;
        client.commands.set(command.name, command);
        Logger.info(`\t${command.name} command has been loaded!`);
      }
    }
  }
}
