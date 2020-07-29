const Discord = require('discord.js')
var tcom = require('thesaurus-com');


module.exports = {
	name:'word',
	description: 'Search something and get the synonyms of that word',
    
    async run (client, message, args){
    const wordLookup = args.join(" "); 
    const synonyms = new Discord.MessageEmbed()
   
   synonyms.setDescription("Here what i could find for: " + wordLookup)
   .addField(tcom.search('never'));
   message.channel.send(synonyms);
      }
    

  
   
 }

    


