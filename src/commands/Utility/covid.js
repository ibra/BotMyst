const fetch = require('node-fetch');
const Discord = require('discord.js');
const {
    SuccessColor, 
    FailureColor,
    Prefix
} = require('../../config.json');

module.exports = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",
    aliases: ['cov', 'covd'],
    usage: `${Prefix}covid Canada [Returns Information About COVID-19 cases in Canada]`,
    category: "Utility",
    execute: async function(client, message, args) {

        //removing Prefix
        let countries = args.join(" ");

        //Error Embed if there is no argument
        const noArgs = new Discord.MessageEmbed()
            .setAuthor('> Error 400')
            .setColor(FailureColor)
            .setDescription('You are missing some arguments!')
            .setFooter('ex: >covid all or >covid Canada')
       
        if (!args[0]) {
            //Also react because yes.
            message.react('👎')
            return message.channel.send(noArgs);
        }
        //If all arguments are provided, use the API to get the covid cases.
        if (args[0] === "all") {
            
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()
 
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`Worldwide COVID-19 Stats 🌎`)
                        .setColor(SuccessColor)
                        .addField('Confirmed Cases', confirmed)
                        .addField('Recovered', recovered)
                        .addField('Deaths', deaths)

                    message.channel.send(embed);
                })

        } else {
          
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    //Assign all provided response data to variables
                    let confirmed = data.confirmed.value.toLocaleString();
                    let recovered = data.recovered.value.toLocaleString();
                    let deaths = data.deaths.value.toLocaleString();
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`COVID-19 Stats for ${countries}`)
                        .addField('Confirmed Cases', confirmed)
                        .addField('Recovered', recovered)
                        .addField('Deaths', deaths)
                        .setColor(SuccessColor)
                        .setTimestamp(Date.now());
                    message.channel.send(embed)
                }).catch(e => {
                    const errorEmbed = new Discord.MessageEmbed()
                        .setAuthor('> Error 404')
                        .setDescription('Couldnt find the country you provided!')
                        .setFooter('Check your spelling in case of an error, or make sure you are providing the name of a country!')
                        .setColor(FailureColor);
                       
                    message.channel.send(errorEmbed);
                })
        
            }
    }
}