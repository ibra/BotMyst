import { PermissionString } from "discord.js";

export interface ICommandOptions {
  name: string;
  description?: string;
  usage?: string;
  category?: string;
  cooldown: number;
  requiredPermissions: PermissionString[];
}
