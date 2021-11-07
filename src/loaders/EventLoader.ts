import * as path from "path";
import { readdir } from "fs";
import { Client } from "../Client";
import { Logger } from "../utils/Logger";

//TODO: left off here trying to fix the event paths
export class EventLoader {
  public load(client: Client): void {
    const eventsPath = path.join(
      __dirname,
      "../",
      `${client.settings.paths.events}`
    );

    readdir(eventsPath, (err, files) => {
      if (err) {
        Logger.error(err);
        return;
      }
      files.forEach((file) => {
        const event = require(`./events/${file}`);
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
      });
    });
  }
}
