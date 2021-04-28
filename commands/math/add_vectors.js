const path = require('path');
const helper = require(path.join("/CSBless", "/helpers", "/vectors.js"));

module.exports = {
	name: 'add_vectors',
    category: 'Vector Operations',
    description: 'Adds a set of given vectors.',
    usage: '[vector 1] [vector 2]...[vector n] (formatted as so, [1,2,3] [4,5,6] [7,8,9]...) (note: only works on real number vectors)',
    aliases: ['add'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length < 2) {
                return message.channel.send("Error: not enough vectors. At least 2 vectors needed.");
            }
            const x = helper.add(args); 
            message.channel.send(`Adding the set of vectors gives us [${x.toString()}]`);
        } catch (e) {
            if (e) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error.");
            }
        }
	},
};