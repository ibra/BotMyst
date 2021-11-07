import * as dotenv from 'dotenv';
import { settings } from "./config/config";
import { Client } from "./Client";
import { EventLoader } from "./loaders/EventLoader";

dotenv.config();

const client = new Client(settings);
client.login(settings.token);

//Debugging to figure out this issue
console.log(settings);
client.on('debug', console.log);

client.login("NzY3MTAzNTg2OTIzNzA4NDg2.X4tC4w.K9JTES6jNbrXS35UYvXStr_hrT8").catch(console.error);

