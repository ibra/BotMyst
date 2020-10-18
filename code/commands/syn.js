const Discord = require('discord.js')
var thesaurus = require('thesaurus');


module.exports = {
	name:'syn',
	description: 'Search something and get the synonyms of that word',
    
    async run (client, message, args){
    const wordLookup = args.join(" "); 
    var res = thesaurus.find(wordLookup);
    let pages = res;
    let page = 1;
    const wordEmbed = new Discord.MessageEmbed()
	.setColor(3066993)
	.setTitle('Here are all synonyms for: ' + wordLookup)
    .setDescription(pages[page-1])
    .setFooter(`Page ${page} of ${pages.length}`)
    .setTimestamp()
    message.channel.send(wordEmbed).then(msg => {
        msg.react('⬅️').then(r => {
        msg.react('➡️')    
        
        const backwardsReaction = (reaction,user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
        const forwardReaction = (reaction,user) => reaction.emoji.name === '➡️' && user.id === message.author.id;

        const backwards = msg.createReactionCollector(backwardsReaction, {time: 50000})
        const forwards = msg.createReactionCollector(forwardReaction, {time: 50000})

        backwards.on('collect', r =>{
        if(page === 1) return;
        page--;
        wordEmbed.setDescription(pages[page-1])
        wordEmbed.setFooter(`Page ${page} of ${pages.length}`);
        msg.edit(wordEmbed);
        })
      
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

    


