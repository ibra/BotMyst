import { ClientEvents } from "discord.js";
import BotMystClient from "../../Client";

type Run = (client: BotMystClient, ...args: any[]) => any;

export default interface IEvent {
  name: keyof ClientEvents;
  once?: boolean;
  run: Run;
}
