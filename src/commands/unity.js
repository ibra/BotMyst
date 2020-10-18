const Discord = require('discord.js')

module.exports = {
  name: "unity",
  description: "A command that shows results from specific websites",

  execute: async function(client, message, args) {
        // remove the suffix
        const search = args.join(" ");
        console.log(search)
        google('node.js best practices', (err, res) => {
          if (err) console.error(err)
          
          for (var i = 0; i < res.link.length; ++i) {
            var link = res.links[i];
            
              
         
            console.log(link.title + ' - ' + link.href)
            console.log(link.description + "\n")
            const embed = new Discord.MessageEmbed()
            .setTitle('Heres what I could find')
            .setColor(3066993)
            .addField(link.title + ' - ' + link.href)
            .addField(link.description + "\n")
            .setTimestamp(Date.now());
             message.channel.send(embed)
          }
        })
   
  
  }

}
