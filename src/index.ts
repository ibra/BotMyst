import { config } from "dotenv";
import { ClientConfig } from "./config/config";
import { Client } from "./Client";
import { EventLoader } from "./loaders/EventLoader";

config();

const client = new Client(ClientConfig);
console.log(client.categories[0]);
const events = new EventLoader();

events.load(client);
client.login(ClientConfig.token).catch(console.error);
