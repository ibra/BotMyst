var Trello = require("trello");
var trello = new Trello("19c3f00e729c2ea5e1be8d7931422dd1", "64dcea1f14c2a8a838c2aa941e50de727bf359f4c4b38d6892bfb2f46380cff3");
const Discord = require('discord.js')

module.exports = {
    name: "suggest",
    description: "A command that adds whatever you suggest into a trello card under 69 characters (nice).",

   async run (client, message, args) {
    const suggestion = args.join(" "); 
if(suggestion.length > 69)
 {
    const trelloError = new Discord.MessageEmbed()
    .setTitle('I was unable to send this suggestion!' + error)
    .setColor(0xFF0000)
    .setDescription('Your suggestion contains more than 100 characters in it!')
    .setTimestamp(Date.now());
    message.channel.send(trelloError)
    return;

 }
    
    trello.addCard(suggestion, 'suggested by: '+ message.author, "5f1859be01143f419cf398e9");
    const trelloSuccess = new Discord.MessageEmbed()
    .setTitle('The suggestion has been added!')
    .setColor(0x00FF00)
    .setDescription('The following suggestion has been added to the developers trello list!: ' + suggestion)
    .setTimestamp();
    message.channel.send(trelloSuccess);
       
   }
    
    
} 
   
   


 