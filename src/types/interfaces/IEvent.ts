import { ClientEvents } from "discord.js";
import { Client } from "../../Client";

type Run = (client: Client, ...args: any[]) => any;

export default interface IEvent {
  name: keyof ClientEvents;
  once?: boolean;
  run: Run;
}
