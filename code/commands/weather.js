const weather = require('weather-js');
const Discord = require('discord.js');
const { weatherDegreeType } = require('../config.json');

module.exports = {
    name: "weather",
    description: "Checks a weather forecast",

    async run (client, message, args){

    weather.find({search: args.join(" "), degreeType: weatherDegreeType}, function (error, result){
        
        if(error)
       { 
         message.channel.send("Please specify a location.");
         return message.react('👎')
       }
        if(!args[0])
        {
            message.channel.send('Please specify a location.')
            return message.react('👎')
        } 

        if(result === undefined || result.length === 0)
        {
        message.channel.send('The location you have specified is either invalid or contains a typo, please try again.');
        return message.react('👎')
        }

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', 'Fahrenheit', true)
        .addField('Temperature', `${current.temperature}°`, true)
        .addField('Wind', current.winddisplay, true)
        .addField('Feels like', `${current.feelslike}°`, true)
        .addField('Humidity', `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}