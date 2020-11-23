const Discord = require('discord.js')
const {
    SuccessColor, FailureColor
} = require('../config.json');
const fetch = require('node-fetch');



module.exports = {
    name: "dict",
    description: "A command that shows the meaning of a word",
    aliases: ['dictionary'],
    usage: ">dict idiot [returns definition of word]",
    category: "Core",
  
    execute: async function(client, message, args) {
      
        //Remove prefix.
        const wordLookup = args.join(" ");
        //Create new embed.
        const dictionaryEmbed = new Discord.MessageEmbed()
        const requestURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
        const results = await fetch(`${requestURL}/${wordLookup}`);
        const json = await results.json();
      
        if(json[0] != null)
        {
       
        var phonetics = json[0].phonetics[0].text;
        var meaning = json[0].meanings[0].definitions[0].definition;
        var example = json[0].meanings[0].definitions[0].example;
         
        dictionaryEmbed.setAuthor(`${json[0].word} | ${phonetics}`)
        dictionaryEmbed.setFooter("e.g: " +  example);
        dictionaryEmbed.setDescription(meaning);
        dictionaryEmbed.setColor(SuccessColor);
        message.channel.send(dictionaryEmbed);
        
    } else  {

            dictionaryEmbed.setAuthor("> Error 404")
            dictionaryEmbed.setDescription("Sorry! I was unable to find that word.");
            dictionaryEmbed.setColor(FailureColor);
            message.channel.send(dictionaryEmbed);
        }

    }

}