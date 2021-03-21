import { Client, Collection, MessageEmbed } from "discord.js";
import fs from "fs";
import { Colors } from "./colors.js";
import { Config, Token, Prefix } from "./config.js";

const COMMANDS_PATH = "src/commands";

const client = new Client();

async function main() {
    // Creating new Discord Collections for our commands and our aliases
    client.commands = new Collection();
    client.aliases = new Collection();
    client.categories = fs.readdirSync(COMMANDS_PATH);

    if (Config === null) {
        return;
    }

    client.login(Token);

    await registerCommands();

    client.on("ready", onReady);
    client.on("message", onMessage);
}

/**
 * Runs on the "ready" event of the bot.
 */
function onReady() {
    console.log("BotMyst is ready!");
}

/**
 * Runs on the "message" event of the bot.
 */
function onMessage(msg) {
    // yes sir response
    if (msg.mentions.has(client.user.id)) {
        let embed = new MessageEmbed();
        embed.setDescription(`**yes sir**`);
        embed.setColor(Colors.ORANGE);
        msg.channel.send(embed);
    }

    if (!msg.content.startsWith(Prefix)) return;
    if (msg.author.bot) return;
    if (msg.channel.type == "dm") return;

    const args = msg.content.slice(Prefix.length).split(" ");
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
                    client.commands.find(c => c.aliases && c.aliases.includes(commandName));

    if (!command) return;

    // todo: maybe restrict to a specific channel(s)

    try {
        command.execute(client, msg, args);
    } catch (err) {
        console.log(err);
    }
}

function readDirDeep(path) {
    let res = [];

    const list = fs.readdirSync(path);

    list.forEach(f => {
        const newPath = `${path}/${f}`;
        let stat = fs.statSync(newPath);
        if (stat && stat.isDirectory()) {
            res = res.concat(readDirDeep(newPath));
        } else {
            res.push(newPath);
        }
    });

    return res;
}

/**
 * Registers all commands and their aliases.
 */
async function registerCommands() {
    const files = readDirDeep(COMMANDS_PATH).filter(f => f.endsWith(".js"));

    for (const file of files) {
        const command = await import(`../${file}`);

        client.commands.set(command.name, command);

        if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach(a => client.aliases.set(a, command.name));
        }
    }
}

main();
