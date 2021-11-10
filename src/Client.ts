import * as Discord from "discord.js";
import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { CommandLoader } from "./loaders/CommandLoader";
import { IBotMystClient } from "./types/interfaces/IBotMystClient";
import ICommand from "./types/interfaces/ICommand";
import { ISettings } from "./types/interfaces/ISettings";

export class Client extends Discord.Client implements IBotMystClient {
  public settings: ISettings;

  public commands: Collection<string, ICommand> = new Collection();
  public commandLoader: CommandLoader;

  public constructor(settings: ISettings) {
    super(settings.clientOptions || { intents: ["GUILDS", "GUILD_MESSAGES"] });

    this.settings = settings;
    this.settings.token = process.env.TOKEN;

    this.commandLoader = new CommandLoader();
    this.commandLoader.loadCommands(this);
  }

  public userHasPermission(
    user: Discord.GuildMember,
    requiredPermissions: Discord.PermissionString[]
  ): boolean {
    return user.permissions.has(requiredPermissions, true);
  }
}
