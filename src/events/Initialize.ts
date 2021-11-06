import { Client } from '../Client';
import Logger from '../utils/Logger';
import { IEvent } from '../types';

export default class Initialize implements IEvent {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async run(): Promise<void> {
        Logger.info('BotMyst is up, bitches.');
        this.client.user!.setPresence(this.client.settings.presence);
    }
}