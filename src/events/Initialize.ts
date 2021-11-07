import { Client } from '../Client';

import { Logger } from '../utils/Logger';
import { IEvent } from '../types';

export default class Ready implements IEvent {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async run(): Promise<void> {
        Logger.info('Beew is running.');
        this.client.user!.setPresence(this.client.settings.presence);
    }
}