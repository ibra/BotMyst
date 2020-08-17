const Util = require('./../modules/util')
const Logger = new Util.Logger();
const requests = require('./../modules/requests')
const config = require('../config.json');

module.exports = {
	name:'wiki',
	description: 'Search something on Wikipedia with this command and get a short summary of it.',
	async run (client, message, args){
    {

		const command = args[0].slice(config.PREFIX.length)
     	let requestLang = 'en';

    if (!args[0]) {
			message.react('👎').catch(e => Logger.error(e))
			message.channel.send({
				embed: {
					color: 0xe74c3c,
					description: 'The command you gave was invalid or doesnt exist'},
			          })
		}
		else {
			let searchValue = args.toString().replace(/,/g, ' ')
			searchValue = searchValue.replace(config.PREFIX + command + ' ', '')
             
			requests.getWikipediaShortSummary(message, searchValue, requestLang).catch(e => Logger.error(e))
		}

	}
}

}
