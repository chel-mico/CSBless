const path = require('path');
const helper = require(path.join("/CSBless", "/helpers", "/vectors.js"));

module.exports = {
	name: 'length',
    description: 'Takes the length of a given vector.',
    usage: '[vector 1] (formatted as so, [1,2,3]) (note: only works on real number vectors)',
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length !== 1) {
                return message.channel.send("Error: wrong number of vectors. 1 vector needed.");
            }
            const x = helper.length(args[0]); 
            message.channel.send(`The length of ${args[0]} is [${x.toString()}]`);
        } catch (e) {
            if (e) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error.");
            }
        }
	},
};