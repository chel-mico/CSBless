const path = require('path');
const helper = require(path.join("/CSBless", "/helpers", "/matrices.js"));

module.exports = {
	name: 'add_matrices',
    category: 'Matrix Operations',
    description: 'Adds a set of given matrices.',
    usage: '[matrix 1] [matrix 2]...[matrix m] (formatted like so, {[1,2]|[1,2]} {[3,4]|[3,4]}, where each vector in the matrix is a row) (note: only works on real number matrices)',
    aliases: ['addM'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length < 2) {
                return message.channel.send("Error: not enough matrices. At least 2 matrices needed.");
            }
            const x = helper.add(args);
            message.channel.send(`Adding the set of matrices gives us [${x.toString()}]`);
        } catch (e) {
            if (e) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error.");
            }
        }
	},
};