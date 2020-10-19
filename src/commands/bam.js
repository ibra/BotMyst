module.exports = {
    name: "bam",
    description: "Bams a user.",
    aliases: [],

    execute: async function (client, message, args) {
        message.channel.send('User has been bammed.');
    }
}