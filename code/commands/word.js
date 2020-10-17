const Discord = require('discord.js')
var thesaurus = require('thesaurus');


module.exports = {
	name:'word',
	description: 'Search something and get the synonyms of that word',
    
    async run (client, message, args){
    let pages = [];
    let page = 1;
    const wordEmbed = new Discord.MessageEmbed()
	.setColor(3066993)
	.setTitle('Pages Test')
    .setDescription(pages[page-1])
    .setFooter(`Page ${page} of ${pages.length}`)
    .setTimestamp()
    message.channel.send(wordEmbed).then(msg => {
        message.react('⬅️').then(r => {
        message.react('➡️')    
        
        const backwardsReaction = reaction.emoji.name === '⬅️' && user.id === message.author.id;
        const forwardReaction = reaction.emoji.name === '➡️' && user.id === message.author.id;

        const backwards = message.createReactionCollector(backwardsReaction, {time: 50000})
        const forwards = message.createReactionCollector(forwardReaction, {time: 50000})

        backwards.on('collect', r =>{
        if(page === 1) return;
        page--;
        wordEmbed.setDescription(pages[page-1])
        wordEmbed.setFooter(`Page ${page} of ${pages.length}`);
        message.edit(wordEmbed);

        })
        })
        
        
    })
  //  const wordLookup = args.join(" "); 
//res = thesaurus.find(wordLookup);
      }
    

  
   
 }

    


