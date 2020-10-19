const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",
    aliases: ['cov','covd'],
    usage: ">covid Canada [Returns Information About COVID-19 cases in America]",
    execute: async function(client, message, args){

        let countries = args.join(" ");
        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(0xFF0000)
        .setDescription('You are missing some arguments! (ex: >covid all or >covid Canada)')
        .setTimestamp()

        if(!args[0]) 
        {
          message.react('👎')
          return message.channel.send(noArgs);
        }

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Worldwide COVID-19 Stats 🌎`)
                .setColor(3066993)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`COVID-19 Stats for **${countries}**`)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)
                .setColor(3066993)
                .setTimestamp(Date.now());
                message.channel.send(embed)
            }).catch(e => {
                const errorEmbed = new Discord.MessageEmbed()
                .setTitle('Couldnt find the country you provided!')
                .setDescription('Check your spelling in case of an error, or make sure you are providing the name of a country!')
                .setColor(15158332) 
                message.channel.send(errorEmbed)
            })
        }
    }
}