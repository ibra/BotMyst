import * as dotenv from 'dotenv';
import { settings } from "./config/config";
import { Client } from "./Client";
import { EventLoader } from "./loaders/EventLoader";

dotenv.config();

const client = new Client(settings);
client.login(settings.token).catch(console.error);

//Debugging to figure out this issue
console.log(settings);
client.on('debug', console.log);