import * as path from "path";
import { readdir, statSync } from "fs";
import { Collection } from "discord.js";
import { IBotMystClient } from "../types/interfaces/IBotMystClient";
import { Command } from "../Command";
import { Logger } from "../utils/Logger";

export class CommandLoader {
  public commands: Collection<string, Command>;

  constructor() {
    this.commands = new Collection();
  }

  public loadCommands(client: IBotMystClient): void {
    const commandPath = path.join(__dirname, "../commands");
    readdir(commandPath, (err, files) => {
      if (err) {
        Logger.error(err);
        return;
      }
      files.forEach((file) => {
        const filePath = path.join(commandPath, file);
        const stats = statSync(filePath);
        if (stats.isDirectory()) {
          return;
        }
        const command = new (require(filePath).default)(client);
        this.commands.set(command.name, command);
      });
    });
  }
}
