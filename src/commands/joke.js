const jokes = require('discord-jokes')

module.exports = {
    name: "joke",
    description: "Gives a cheesy dad joke.",
    aliases: [],

    execute: async function (client, message, args) {
        jokes.getRandomDadJoke(function (joke) {
            message.channel.send(joke);
        })
    }
}