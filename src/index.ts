import { settings } from "./config/config.js";
import { Client } from "./Client";
import { EventLoader } from "./loaders/EventLoader";

const client = new Client(settings);
const events = new EventLoader();

events.load(client);
client.login(client.settings.token);
