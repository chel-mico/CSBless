const path = require('path');
const helper = require(path.resolve(process.cwd(), "./helpers/vectors.js"));

module.exports = {
	name: 'projection',
    category: 'Vector Operations',
    description: 'Takes the projection of a vector v on to a vector u.',
    usage: '[vector u] [vector v] (formatted as so, [1,2,3] [4,5,6]) (note: only works on real number vectors)',
    aliases: ['proj'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length !== 2) {
                return message.channel.send("Error: wrong number of vectors. 2 vectors needed.");
            }
            const x = helper.proj(args[0], args[1]); 
            message.channel.send(`Adding the set of vectors gives us [${x.toString()}]`);
        } catch (e) {
            if (/ Error: /.test(e)) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error. If the problem persists, please open an issue on our GitHub: https://github.com/chel-mico/CSBless/issues");
            }
        }
	},
};