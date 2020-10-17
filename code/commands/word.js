const Discord = require('discord.js')
var thesaurus = require('thesaurus');


module.exports = {
	name:'word',
	description: 'Search something and get the synonyms of that word',
    
    async run (client, message, args){
    let pages = ['Wow a page', 'Wow another one', 'Damn bro stop with all these pages', 'goddamn theres another one', 'bruh another one?', 'bruh no cap seriously stop', 'K thanks for stopping'];
    let page = 1;
    const wordEmbed = new Discord.MessageEmbed()
	.setColor(3066993)
	.setTitle('Pages Test')
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
     //  const wordLookup = args.join(" "); 
    //res = thesaurus.find(wordLookup);
      }
    

  
   
 }

    


