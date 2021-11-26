import { PresenceData, ClientOptions } from "discord.js";

export interface ISettings {
  presence: PresenceData;
  clientOptions?: ClientOptions;
  token?: string;
}
