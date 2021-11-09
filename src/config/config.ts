import { resolve } from "path";
import { ISettings } from "../types/interfaces/ISettings";

export const settings: ISettings = {
  presence: {
    status: "online",
    activities: [
      {
        name: "with my friends",
        type: "WATCHING",
      },
    ],
  },
  prefix: ">",
  token: process.env.TOKEN,
};
