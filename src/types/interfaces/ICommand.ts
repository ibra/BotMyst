import { CommandInteraction, Message } from "discord.js";
import { Client } from "../../Client";
import { readdirSync } from "fs";

const categories = <const>[...readdirSync("./commands")];

type Run = (
  client: Client,
  message: Message,
  args: string[]
) => any | Promise<any>;

type SlashRun = (
  client: Client,
  interaction: CommandInteraction
) => any | Promise<any>;

type Category = typeof categories[number];

export default interface ICommand {
  name: string;
  description?: string;
  aliases?: string[] | string;
  type?: number;
  options?: any[];
  usage?: string;
  category: Category;
  permissions?: Permissions | Permissions[];
  run: Run;
  slashRun?: SlashRun;
}
