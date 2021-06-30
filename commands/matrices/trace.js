const path = require('path');
const helper = require(path.resolve(process.cwd(), "./helpers/matrices.js"));

module.exports = {
	name: 'trace',
    category: 'Matrix Operations',
    description: 'Calculates the trace of the given matrix.',
    usage: '[matrix 1] (formatted like so, {[1,2]|[1,2]}, where each vector in the matrix is a row) (note: only works on real number matrices)',
    aliases: ['tr'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length !== 1) {
                return message.channel.send("Error: one matrix only.");
            }
            const result = helper.tr(args[0]);
            message.channel.send(`The trace of the matrix is ${result}.`);
        } catch (e) {
            if (/Error:/.test(e)) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error. If the problem persists, please open an issue on our GitHub: https://github.com/chel-mico/CSBless/issues");
            }
        }
	},
};