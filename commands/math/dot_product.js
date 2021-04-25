const path = require('path');
const helper = require(path.join("/CSBless", "/helpers", "/vectors.js"));

module.exports = {
	name: 'dot_product',
    description: 'Takes the dot product of two given vectors.',
    usage: '[vector 1] [vector 2] (formatted as so, [1,2,3], [4,5,6]) (note: only works on real number vectors)',
    aliases: ['dp', 'dot'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length !== 2) {
                return message.channel.send("Error: wrong number of vectors. 2 vectors needed.");
            }
            const x = helper.dp(args[0], args[1]); //calls dot product from the helper file
            message.channel.send(`The dot product of ${args[0]} and ${args[1]}} is ${x}`);
        } catch (e) { //catches errors thrown by helper file
            if (e) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error.");
            }
        }
	},
};