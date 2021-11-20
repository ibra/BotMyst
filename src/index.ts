import "module-alias/register";
import { config } from "dotenv";
import { ClientConfig } from "@config/config";
import BotMystClient from "./Client";
import { EventLoader } from "@loaders/EventLoader";

config();

const client = new BotMystClient(ClientConfig);
const events = new EventLoader();

events.load(client);
client.login(ClientConfig.token).catch(console.error);
