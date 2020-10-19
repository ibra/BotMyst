//Discord Initialization
const Discord = require("discord.js");
const { readdirSync } = require('fs');
const { token, botSpam, PREFIX } = require('./config.json');



const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = readdirSync(`./commands`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

  client.on("message", async message => {

    if(!message.content.startsWith(PREFIX) || message.author.bot || message.channel.type === 'dm') return;
   
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const fullCmd = client.commands.get(command)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

        if(!fullCmd) return;
        if(message.channel.id != botSpam)
        {
            const botError = new Discord.MessageEmbed()
            .setDescription('This bot is still in its early stages so its commands are restricted to the #bot channel.')
            .setColor(0xFF0000)
            .setTimestamp();
            message.reply(botError)
            .then(msg => {
            msg.delete({timeout: 5000})
            })
            .catch(console.error);
            return;
        }
            
        try {
            fullCmd.execute(client, message, args);
            message.react('👀')
        } catch (error){
            console.error(error);
        }
    
})

client.on("error", console.error);

client.on("ready", () => {
    //Run if the bot starts, and logs in, successfully.
    client.user.setActivity(`Helping out ${client.users.cache.size} users, in ${client.channels.cache.size} channels from ${client.guilds.cache.size} servers.`);
    commandFiles.forEach(cmd => {
        console.log(`${cmd} loaded.`);
      })

    })

client.login(token);