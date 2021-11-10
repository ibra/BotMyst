import { IBotMystClient } from "../types/interfaces";
import ICommand from "../types/interfaces/ICommand";

const command: ICommand = {
  name: "ping",
  description: "Pong!",
  aliases: ["pong"],
  category: "General",
  usage: "ping",

  async run(client: IBotMystClient, message: any, args: string[]) {
    message.channel.send("Pong!");
  },
};
export default command;
