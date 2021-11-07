import {
    Client,
    TextChannel,
    DMChannel,
    GuildMember,
    PermissionString,
    PresenceData,
    ClientOptions,
    MessageEmbed,
    Guild,
    User,
} from 'discord.js';

export interface IBotMystClient extends Client {
    settings: ISettings;
    commandLoader: any;
    userHasPermission(user: GuildMember, requiredPermissions: PermissionString[]): boolean;
}

export interface ICommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
    cooldown: number;
    requiredPermissions: PermissionString[];
}

export interface ISettings {
    presence: PresenceData;
    clientOptions?: ClientOptions;
    token?: string;
    prefix: string;
    paths: {
        commands: string;
        events: string;
    };
}

export interface IEvent {
    client: IBotMystClient;
    run(args?: any[]): void;
}

export interface IUserCooldown {
    user: User;
    guild: Guild;
}

export type AnyChannel = TextChannel | DMChannel;
export type EmbedOrMessage = MessageEmbed | string;