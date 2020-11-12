//Discord Initialization
const Discord = require("discord.js");
const { readdirSync } = require('fs');
const { BotToken, BotSpam, PREFIX } = require('./config.json');

// Creating a new bot client that we login with
const client = new Discord.Client();
client.commands = new Discord.Collection();


//Going through each command and setting the command to the actual discord command
const commandFiles = readdirSync(`./commands`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


  client.on("message", async message => {
//Checking if message starts with prefix, the message was sent by a bot or if the message was in a direct message. If so, returning.
 if(!message.content.startsWith(PREFIX) || message.author.bot || message.channel.type === 'dm') return;
   
    //String Manipulation to remove the prefix and lowercasing all arguments so they are not case-senstitive
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    // fullCmd includes the command AS WELL AS its aliases
    const fullCmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    if(!fullCmd) return;
        //Since the bot isnt completely finished, its commands are restricted to BotSpam, change it to None if you want to use it everywhere
        if(message.channel.id != BotSpam && BotSpam != "None")
        {
            const botError = new Discord.MessageEmbed()
            .setDescription('This bot is still in its early stages so its commands are restricted to the #bot channel.')
            .setColor(0xFF0000)
            .setTimestamp();
            message.reply(botError)
            .then(msg => {
            msg.delete({timeout: 5000});
            })
            .catch(console.error);
            return;
        }
        //Trying to execute the fullCmd, passed in arguments: client, message and args.  
        try {
           
         fullCmd.execute(client, message, args);

        } catch (error){
            console.error(error);
        }
    
})

//Just a simple console log for debugging an error if the bot fails to turn on
client.on("error", console.error);

client.on("ready", () => {
    //Run if the bot starts, and logs in, successfully.
    client.user.setActivity(`Helping out ${client.users.cache.size} users.`);
    commandFiles.forEach(cmd => {
        console.log(`${cmd} loaded.`);
      })

    })

//Login with the bot token provided in config.json.
client.login(BotToken);