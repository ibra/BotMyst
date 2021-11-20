import { join } from "path";
import { readdirSync } from "fs";
import { CommandLoader } from "@loaders/CommandLoader";
import { IBotMystClient } from "@typings/interfaces/IBotMystClient";
import ICommand from "@typings/interfaces/ICommand";
import { ISettings } from "@typings/interfaces/ISettings";
import { Client, Collection, GuildMember, PermissionString } from "discord.js";

export default class BotMystClient extends Client implements IBotMystClient {
  public settings: ISettings;

  public commands: Collection<string, ICommand> = new Collection();
  public commandLoader: CommandLoader;

  public constructor(settings: ISettings) {
    super(
      settings.clientOptions || {
        intents: ["GUILDS", "GUILD_MESSAGES"],
      }
    );

    this.settings = settings;
    this.settings.token = process.env.TOKEN;

    this.categories = readdirSync(join(__dirname, `./commands`));

    this.commandLoader = new CommandLoader();
    this.commandLoader.loadCommands(this);
  }
  categories: string[];

  public userHasPermission(
    user: GuildMember,
    requiredPermissions: PermissionString[]
  ): boolean {
    return user.permissions.has(requiredPermissions, true);
  }
}
