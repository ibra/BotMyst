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
    commands: "src/commands",
    events: "src/events",
  },
};