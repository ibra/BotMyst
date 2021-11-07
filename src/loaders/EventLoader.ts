import * as path from "path";
import { readdir } from "fs";
import { Client } from "../Client";
import { Logger } from "../utils/Logger";

//TODO: Events still definitely arent being loaded properly
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
        const event = require(`${eventsPath}/${file}`);
        console.log(event);
        if (event.once) {
          console.log(event.name);
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          console.log(event.name);
          client.on(event.name, (...args) => event.execute(...args));
        }
      });
    });
  }
}
