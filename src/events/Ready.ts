import { Logger } from "../utils/Logger";
import IEvent from "../types/interfaces/IEvent";

const event: IEvent = {
  name: "ready",
  run(client) {
    Logger.info(`${client.user?.username} is ready!\n`);
  },
};
export default event;
