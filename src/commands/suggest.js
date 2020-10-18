var Trello = require("trello");

const config =  require('../config.json');

var trello = new Trello(config.TrelloKey, config.TrelloToken);

const Discord = require('discord.js')

module.exports = {
    name: "suggest",
    description: "A command that adds whatever you suggest into a trello card under 100 characters.",

    execute: async function(client, message, args) {
    const suggestion = args.join(" "); 
if(suggestion.length > 100)
 {
    const trelloError = new Discord.MessageEmbed()
    .setTitle('I was unable to send this suggestion!')
    .setColor(0xFF0000)
    .setDescription('Your suggestion contains more than 100 characters in it!')
    .setTimestamp(Date.now());
    message.channel.send(trelloError)
    return;

 } else {
    
    trello.addCard(suggestion, 'This suggestion was made by: '+ message.author.tag + ", and their id is: " + message.author , "5f1859be01143f419cf398e9");
    const trelloSuccess = new Discord.MessageEmbed()
    .setTitle('The suggestion has been added!')
    .setURL('https://trello.com/b/8wf6nzML/codemyst-revival')
    .setColor(3066993)
    .setDescription('The following suggestion has been added to the developers trello list!: ' + suggestion)
    .setTimestamp();
    message.channel.send(trelloSuccess);
 }
       
   }
    
    
} 
   
   


 
