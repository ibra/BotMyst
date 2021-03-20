const Discord = require('discord.js')
var thesaurus = require('thesaurus');
const {
    SuccessColor,
    Prefix
} = require('../../config.json');

module.exports = {
	name:'synonyms',
	description: `${Prefix}Search something and get the synonyms of that word`,
    aliases: ['syn'],
    usage: "its like >dict but instead of meanings it gives synonyms",
    category: "Core",
   
    execute: async function(client, message, args){
    
    const wordLookup = args.join(" "); //Removing the Prefix from argument.
    var res = thesaurus.find(wordLookup); //Calling thesaurus.find, and passing our manipulated string as an argument.
    
    let pages = res; //Assign our result to a variable
    let page = 1; //the current page we are on.
    const wordEmbed = new Discord.MessageEmbed() //Creating a new embed
	.setColor(SuccessColor)
	.setTitle('Here are all synonyms for: ' + wordLookup)
    .setDescription(pages[page-1])
    .setFooter(`Page ${page} of ${pages.length}`)
    .setTimestamp()
    //Send the embed and create a reaction collecter to listen for page changes.
    message.channel.send(wordEmbed).then(msg => {
        msg.react('⬅️').then(r => {
        msg.react('➡️')    
        
        //Checking if the message author is reacting, these values are arguments for our reaction collecter.
        const backwardsReaction = (reaction,user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
        const forwardReaction = (reaction,user) => reaction.emoji.name === '➡️' && user.id === message.author.id;
        
        //Creating the actual reaction collecter
        const backwards = msg.createReactionCollector(backwardsReaction, {time: 500000})
        const forwards = msg.createReactionCollector(forwardReaction, {time: 500000})

        //check if there is a backward reaction collected.
        backwards.on('collect', r =>{
        if(page === 1) return;
        page--;
        wordEmbed.setDescription(pages[page-1]);
        wordEmbed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(wordEmbed);
        })
     
        //check if there is a forward reaction collected.
        forwards.on('collect', r =>{
            if(page === pages.length) return;
            page++;
            wordEmbed.setDescription(pages[page-1])
            wordEmbed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(wordEmbed);
    
            })
       
        })
        
        
    })
   
 
      }
    

   
 }

    


