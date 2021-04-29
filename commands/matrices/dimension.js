const path = require('path');
const helper = require(path.resolve(process.cwd(), "./helpers/matrices.js"));

module.exports = {
	name: 'dimension',
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
            const arr = helper.dim(args[0]);
            message.channel.send(`Dimensions of the matrix are ${arr[0]}x${arr[1]}`);
        } catch (e) {
            if (e) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error.");
            }
        }
	},
};