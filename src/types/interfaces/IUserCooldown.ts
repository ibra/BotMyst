import { Guild, User } from "discord.js";

export interface IUserCooldown {
  user: User;
  guild: Guild;
}
