import { ISettings } from "../types/interfaces/ISettings";

export const ClientConfig: ISettings = {
  presence: {
    status: "online",
    activities: [
      {
        name: "with my friends",
        type: "WATCHING",
      },
    ],
  },
  token: process.env.TOKEN,
};
