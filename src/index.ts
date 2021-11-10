import { config } from "dotenv";
import { settings } from "./config/config";
import { Client } from "./Client";
import { EventLoader } from "./loaders/EventLoader";

config();

const client = new Client(settings);
const events = new EventLoader();

events.load(client);
client.login(settings.token).catch(console.error);
