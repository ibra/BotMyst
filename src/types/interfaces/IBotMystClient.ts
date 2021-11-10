import {
  Client,
  Collection,
  DMChannel,
  GuildMember,
  MessageEmbed,
  PermissionString,
  TextChannel,
} from "discord.js";
import ICommand from "./ICommand";
import { ISettings } from "./ISettings";

export interface IBotMystClient extends Client {
  settings: ISettings;
  commands: Collection<string, ICommand>;
  commandLoader: any;
  userHasPermission(
    user: GuildMember,
    requiredPermissions: PermissionString[]
  ): boolean;
}

export type AnyChannel = TextChannel | DMChannel;
export type EmbedOrMessage = MessageEmbed | string;
