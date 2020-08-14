const Discord = require('discord.js')
var thesaurus = require('thesaurus');


module.exports = {
	name:'word',
	description: 'Search something and get the synonyms of that word',
    
    async run (client, message, args){
    const wordLookup = args.join(" "); 
    res = thesaurus.find(wordLookup);
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Heres what i could find for: ' + wordLookup)
	.setDescription(res)
	.setTimestamp()
    message.channel.send(exampleEmbed);
      }
    

  
   
 }

    


