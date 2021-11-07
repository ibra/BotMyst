import { resolve } from "path";
import { ISettings } from "../types";

export const settings: ISettings = {
  presence: {
    status: "online",
    activities: [
      {
        name: "with my friends",
        type: "WATCHING",
      }
    ],
  },
  prefix: ">",
  paths: {
    commands: './commands',
    events: './events',
  },
  token: process.env.TOKEN,
};