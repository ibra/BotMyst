const request = require('superagent')

module.exports = {
    name: "dogfact",
    description: "Gives a random fact about dogs.",
    aliases: [],

    execute: async function (client, message, args) {
        request.get('https://dog-api.kinduff.com/api/facts').end((err, res) => {
            if (!err && res.status === 200) {
                message.channel.send(res.body.facts[0])
            } else {
                console.log(`REST call failed: ${err}`)
            }
        });
    }
}