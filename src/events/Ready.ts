import { logger } from "../utils/logger";
import IEvent from "../types/interfaces/IEvent";

const event: IEvent = {
  name: "ready",
  run(client) {
    logger.info(`\n\n${client.user?.username} is ready!\n`);
  },
};
export default event;
