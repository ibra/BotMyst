import {
  User,
  Message,
  Guild,
  DMChannel,
  NewsChannel,
  PartialDMChannel,
  TextChannel,
  ThreadChannel,
} from "discord.js";
import {
  IBotMystClient,
  ICommandOptions,
  EmbedOrMessage,
  IUserCooldown,
} from "./types/interfaces";

export abstract class Command {
  protected client: IBotMystClient;
  public conf: ICommandOptions;
  public cooldowns: Set<IUserCooldown>;

  constructor(client: IBotMystClient, options: ICommandOptions) {
    this.client = client;

    this.conf = {
      name: options.name,
      description: options.description || "No information specified.",
      usage: options.usage || "",
      category: options.category || "Information",
      cooldown: options.cooldown || 1000,
      requiredPermissions: options.requiredPermissions || ["READ_MESSAGES"],
    };

    this.cooldowns = new Set();
  }

  public hasPermission(user: User, message: Message): boolean {
    if (
      !this.client.userHasPermission(
        message.member as any,
        this.conf.requiredPermissions
      ) ||
      [...this.cooldowns].filter(
        (cd) => cd.user === user && cd.guild === message.guild
      ).length > 0
    ) {
      message.channel.send(
        "You don't have permission for this command or you are on cooldown."
      );
      return false;
    }
    return true;
  }

  public setCooldown(user: User, guild: Guild): void {
    this.cooldowns.add({ user, guild });

    setTimeout(() => {
      const cooldown = [...this.cooldowns].filter(
        (cd) => cd.user === user && cd.guild === guild
      )[0];
      this.cooldowns.delete(cooldown);
    }, this.conf.cooldown);
  }

  public respond(
    channel:
      | TextChannel
      | DMChannel
      | PartialDMChannel
      | NewsChannel
      | ThreadChannel,
    message: EmbedOrMessage
  ): Command {
    if (typeof message === "string") {
      channel.send(message);
    } else {
      channel.send({ embeds: [message] });
    }
    return this;
  }
  public abstract run(message: Message, args: string[]): Promise<void>;
}
