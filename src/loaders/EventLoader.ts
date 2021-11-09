import * as path from "path";
import { readdirSync } from "fs";
import { Client } from "../Client";
import { Logger } from "../utils/Logger";
import IEvent from "../types/interfaces/IEvent";

export class EventLoader {
  public load(client: Client): void {
    const eventFiles = readdirSync(path.join(__dirname, "../events")).filter(
      (file) => file.endsWith(".js") || file.endsWith("ts")
    );
    console.log("\nLoading events...\n");

    for (const file of eventFiles) {
      const req = require(`../events/${file}`);
      const event: IEvent = req.default;
      Logger.info(`\t ${event.name} event has been loaded!`);

      if (event.once) {
        client.once(event.name, (...args) => event.run(client, ...args));
      } else {
        client.on(event.name, (...args) => event.run(client, ...args));
      }
    }
  }
}
