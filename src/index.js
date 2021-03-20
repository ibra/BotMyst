//Discord Initialization
const Discord = require("discord.js");
const { readdirSync, fstat } = require("fs");
const { BotToken, BotSpam, Prefix, SuccessColor } = require("./config.json");

// Creating a new bot client that we login with
const client = new Discord.Client();

// Creating new Discord Collections for our commands and our aliases
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.categories = readdirSync("./commands/");

// An array that will contain commands that may have problems in them.
var buggedCommands = [];

// Going through each command and setting the command to the actual discord command
readdirSync("./commands/").forEach((dir) => {
  const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
    file.endsWith(".js")
  );

  for (const file of commands) {
    let pull = require(`./commands/${dir}/${file}`);

    if (pull.name) {
      client.commands.set(pull.name, pull);
    } else {
      buggedCommands.push(file);
      continue;
    }

    if (pull.aliases && Array.isArray(pull.aliases))
      pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
  }
});

if (buggedCommands.length > 0)
  console.log(
    "❌ | Something happened to these files: " + buggedCommands.toString()
  );
else console.log("✅ | Bot is looking good!");

client.on("message", async (message) => {
  if (message.mentions.has(client.user.id)) {
    // We check whether the bot is mentioned.
    let embed = new Discord.MessageEmbed();
    embed.setDescription(`**yes sir**`);
    embed.setColor(SuccessColor);
    message.channel.send(embed);
  }

  //Checking if message starts with Prefix, the message was sent by a bot or if the message was in a direct message. If so, returning.
  if (
    !message.content.startsWith(Prefix) ||
    message.author.bot ||
    message.channel.type === "dm"
  )
    return;

  //String manipulation to remove the Prefix and lowercasing all arguments so commands are not case-sensitive
  const args = message.content.slice(Prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  // fullCmd includes the command AS WELL AS its aliases
  const fullCmd =
    client.commands.get(command) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
  if (!fullCmd) return;

  //Since the bot isnt completely finished, its commands are restricted to BotSpam, change it to None if you want to use it everywhere
  if (message.channel.id != BotSpam && BotSpam != "None") {
    const botError = new Discord.MessageEmbed()
      .setDescription(
        "This bot is still in its early stages so its commands are restricted to the #bot channel."
      )
      .setColor(0xff0000);
    message
      .reply(botError)
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      })
      .catch(console.error);
    return;
  }
  //Trying to execute the fullCmd, passed in arguments: client, message and args.
  try {
    fullCmd.execute(client, message, args);
  } catch (error) {
    console.error(error);
  }
});

//Just a a few simple console logs for debugging errors/warnings if there are any issues with the Discord API
client.on("error", (e) => console.error(e));
client.on("warning", (e) => console.warn(e));

client.on("ready", () => {
  //Set the bots' Discord Rich Presence
  client.user.setActivity(
    `>help | Helping out ${client.users.cache.size} users.`
  );
});

//Login with the bot token provided in config.json.
client.login(BotToken);
