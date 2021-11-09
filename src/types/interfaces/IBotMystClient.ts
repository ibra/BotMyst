import {
  Client,
  DMChannel,
  GuildMember,
  MessageEmbed,
  PermissionString,
  TextChannel,
} from "discord.js";
import { ISettings } from "./ISettings";

export interface IBotMystClient extends Client {
  settings: ISettings;
  commandLoader: any;
  userHasPermission(
    user: GuildMember,
    requiredPermissions: PermissionString[]
  ): boolean;
}

export type AnyChannel = TextChannel | DMChannel;
export type EmbedOrMessage = MessageEmbed | string;
