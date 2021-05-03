const path = require('path');
const helper = require(path.resolve(process.cwd(), "./helpers/matrices.js"));

module.exports = {
	name: 'transpose',
    category: 'Matrix Operations',
    description: 'Gives the transpose of a given matrix.',
    usage: '[matrix 1] (formatted like so, {[1,2]|[1,2]}, where each vector in the matrix is a row) (note: only works on real number matrices)',
    aliases: ['tp'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length !== 1) {
                return message.channel.send("Error: one matrix only.");
            }
            const x = helper.transpose(args[0]);
            message.channel.send(`The transpose of the matrix is ${helper.str(x)}`);
        } catch (e) {
            if (/^Error: $/.test(e)) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error. If the problem persists, please open an issue on our GitHub: https://github.com/chel-mico/CSBless/issues");
            }
        }
	},
};