const path = require('path');
const helper = require(path.join("/CSBless", "/helpers", "/vectors.js"));

module.exports = {
	name: 'cross_product',
    description: 'Takes the cross product of two given vectors',
    usage: '[vector 1] [vector 2] (formatted as so, [1,2,3], [4,5,6]) (note: only works on real number vectors) (make sure both vectors are in R^3)',
    aliases: ['cp', 'cross'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length !== 2) {
                return message.channel.send("Error: wrong number of vectors. 2 vectors needed.");
            }
            const x = helper.cp(args[0], args[1]); 
            message.channel.send(`The cross product of ${args[0]} and ${args[1]} is [${x.toString()}]`);
        } catch (e) {
            if (e) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error.");
            }
        }
	},
};