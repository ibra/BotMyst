import dateTime from 'date-time';

/**
 * Returns a rounded number.
 *
 * @param {Number} value - The number you want to round.
 * @param {Number} precision - Precision of the decimal number.
 *
 * @private
 */
// Thanks Billy Moon for giving the answer how to make a more precise round function: https://stackoverflow.com/a/7343013
export function roundNumber(value, precision) {
	const multiplier = Math.pow(10, precision || 0)
	return Math.round(value * multiplier) / multiplier
}

export class Logger {

	debug(text) {
		console.log(`[DEBUG] [${dateTime({ local: true, showTimeZone: true })}] ${text}`.debug)
	}

	error(text) {
		console.log(`[ERR] [${dateTime({ local: true, showTimeZone: true })}] ${text}`.error)
	}

	errorChat(msg, text) {
		if(msg.channel.type === 'dm' || msg.channel.type === 'group') {
			console.log(`[ERR] [${dateTime({ local: true, showTimeZone: true })}] DM Chat: ${text}`.error)
		}
		else{
			console.log(`[ERR] [${dateTime({ local: true, showTimeZone: true })}] (${msg.guild.name} | ${msg.guild.id}): ${text}`.error)
		}
	}

	info(text) {
		console.log(`[INFO] [${dateTime({ local: true, showTimeZone: true })}] ${text}`.info)
	}

	warn(text) {
		console.log(`[WARN] [${dateTime({ local: true, showTimeZone: true })}] ${text}`.warn)
	}

}
