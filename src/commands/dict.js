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

    execute: async function (client, message, args) {
    const wordLookup = args.join(" ");
    const dictionaryEmbed = new Discord.MessageEmbed()
    dict.define(wordLookup, function(error, result){
        if (error == null) {
            for(var i=0; i<result.length; i++){     
                dictionaryEmbed.setTitle(`*${result[i].partOfSpeech}*`)  
                dictionaryEmbed.setAuthor(wordLookup)    
                dictionaryEmbed.setColor("RANDOM") 
                var res = result[i].definition.replace(/:/g, "");
                dictionaryEmbed.setDescription('**Definitions:** ' + res);
                message.channel.send(dictionaryEmbed);
            }
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