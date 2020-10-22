const Discord = require('discord.js')
const { DictionaryKey } = require('../config.json');
var Dictionary = require('./../modules/dictionary'),
	
	//pass the constructor a config object with your key
	dict = new Dictionary({
		key: DictionaryKey
    });
    
module.exports = {
    name: "dict",
    description: "A command that shows the meaning of a word",
    aliases: ['dictionary'],
    usage: ">dict idiot [returns definition of word]",
 
    execute: async function (client, message, args) {
    const wordLookup = args.join(" ");
    const dictionaryEmbed = new Discord.MessageEmbed()
    dict.define(wordLookup, function(error, result){
        if (error == null) {
                var i = 1;    
                dictionaryEmbed.setTitle(`*${result[i].partOfSpeech}*`)  
                dictionaryEmbed.setAuthor(wordLookup)    
                dictionaryEmbed.setColor("RANDOM") 
                dictionaryEmbed.setFooter(`Page ${i} of ${result.length - 1}` + " | " + `Requested by ${message.author.username}`);
                var res = result[i].definition.replace(/:/g, "");
                dictionaryEmbed.setDescription('**Definitions:** ' + res);
               
                message.channel.send(dictionaryEmbed).then(msg => {
                    msg.react('⬅️').then(r => {
                    msg.react('➡️')    
                    
                    const backwardsReaction = (reaction,user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
                    const forwardReaction = (reaction,user) => reaction.emoji.name === '➡️' && user.id === message.author.id;
            
                    const backwards = msg.createReactionCollector(backwardsReaction, {time: 50000})
                    const forwards = msg.createReactionCollector(forwardReaction, {time: 50000})
            
                    backwards.on('collect', r =>{
                    if(i === 0) return;
                    i--;
                    dictionaryEmbed.setTitle(`*${result[i - 1].partOfSpeech}*`)  
                    var res = result[i-1].definition.replace(/:/g, "");
                    dictionaryEmbed.setDescription(res)
                    dictionaryEmbed.setColor("RANDOM") 
                    dictionaryEmbed.setFooter(`Page ${i} of ${result.length - 1}` + " | " + `Requested by ${message.author.username}`);
                    msg.edit(dictionaryEmbed);
                    })
                  
                    forwards.on('collect', r =>{
                        if(i === result.length - 1) return;
                        i++;
                        dictionaryEmbed.setTitle(`*${result[i].partOfSpeech}*`)  
                        var res = result[i-1].definition.replace(/:/g, "");
                        dictionaryEmbed.setDescription(res)
                        dictionaryEmbed.setColor("RANDOM") 
                        dictionaryEmbed.setFooter(`Page ${i} of ${result.length - 1}`+ " | " + `Requested by ${message.author.username}`);
                        msg.edit(dictionaryEmbed);
                
                        })
                   
                    })
                    
                    
                });
          
        }
        else if (error === "suggestions"){
            dictionaryEmbed.setTitle(wordLookup + ' was not found in dictionary. Possible suggestions:');
            var suggestions = "";
            for (var i=0; i < 5; i++){
                dictionaryEmbed.addField(result[i], "⠀");
            }
            console.log(suggestions);
            dictionaryEmbed.setColor("RANDOM")
            message.channel.send(dictionaryEmbed);
        }
        else console.log(error);
    });
    
       
}

}