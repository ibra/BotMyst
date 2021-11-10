import * as path from "path";
import { readdirSync } from "fs";
import { IBotMystClient } from "../types/interfaces/IBotMystClient";
import { Logger } from "../utils/Logger";
import ICommand from "../types/interfaces/ICommand";

export class CommandLoader {
  public loadCommands(client: IBotMystClient): void {
    const commandFiles = readdirSync(
      path.join(__dirname, "../commands")
    ).filter((file: string) => file.endsWith(".js") || file.endsWith("ts"));

    for (const file of commandFiles) {
      const req = require(`../commands/${file}`);
      const command: ICommand = req.default;
      client.commands.set(command.name, command);
      Logger.info(`\t${command.name} command has been loaded!`);
    }
  }
}
