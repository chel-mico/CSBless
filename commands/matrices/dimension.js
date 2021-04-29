const path = require('path');
const helper = require(path.join("/CSBless", "/helpers", "/matrices.js"));

module.exports = {
	name: 'dimensions',
    category: 'Matrix Operations',
    description: 'Returns the dimensions of a given matrix.',
    usage: '[matrix 1] (formatted like so, {[1,2]|[1,2]}, where each vector in the matrix is a row) (note: only works on real number matrices)',
    aliases: ['dim'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length !== 1) {
                return message.channel.send("Error: one matrix only.");
            }
            const {m, n} = helper.add(args);
            message.channel.send(`Dimensions of the matrix are ${m}x${n}`);
        } catch (e) {
            if (e) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error.");
            }
        }
	},
};