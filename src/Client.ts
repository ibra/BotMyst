import * as Discord from "discord.js";
import { join } from "path";
import { readdirSync } from "fs";
import { CommandLoader } from "@loaders/CommandLoader";
import { IBotMystClient } from "@typings/interfaces/IBotMystClient";
import ICommand from "@typings/interfaces/ICommand";
import { ISettings } from "@typings/interfaces/ISettings";
import { Collection } from "discord.js";

export class Client extends Discord.Client implements IBotMystClient {
  public settings: ISettings;

  public commands: Collection<string, ICommand> = new Collection();
  public commandLoader: CommandLoader;

  public constructor(settings: ISettings) {
    super(settings.clientOptions || { intents: ["GUILDS", "GUILD_MESSAGES"] });

    this.settings = settings;
    this.settings.token = process.env.TOKEN;

    this.categories = readdirSync(join(__dirname, `./commands`));

    this.commandLoader = new CommandLoader();
    this.commandLoader.loadCommands(this);
  }
  categories: string[];

  public userHasPermission(
    user: Discord.GuildMember,
    requiredPermissions: Discord.PermissionString[]
  ): boolean {
    return user.permissions.has(requiredPermissions, true);
  }
}
