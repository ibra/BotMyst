//Discord Initialization
const Discord = require("discord.js");
const client = new Discord.Client();


//Command Handling
const { token } = require('./config.json');
const { botSpam } = require('./config.json');

const { readdirSync } = require('fs');
const { join }  = require('path');
const { connect } = require("http2");

client.commands = new Discord.Collection();




//Customizable stuff
const prefix = '>';
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));


for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}
client.on("error", console.error);

client.on("ready", () => {
    //Run if the bot starts, and logs in, successfully.
    client.user.setActivity(`Helping out ${client.users.cache.size} users, in ${client.channels.cache.size} channels from ${client.guilds.cache.size} servers.`);
    console.log(`Helping out ${client.users.cache.size} users, in ${client.channels.cache.size} channels from ${client.guilds.cache.size} servers.`);
   
  });

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
 
  
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;
        if(message.channel.id != botSpam)
        {
            const botError = new Discord.MessageEmbed()
            .setDescription('This bot is still in its early stages so its commands are restricted to the #bot channel.')
            .setColor(0xFF0000)
            .setTimestamp(Date.now());
            message.reply(botError)
            .then(msg => {
            msg.delete({timeout: 5000})
            })
            .catch(console.error);
             return;
        }
            

        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})



client.login(token);