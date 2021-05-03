const path = require('path');
const helper = require(path.resolve(process.cwd(), "./helpers/matrices.js"));

module.exports = {
	name: 'matrix_product',
    category: 'Matrix Operations',
    description: 'Multiplies a set of given matrices.',
    usage: '[matrix 1] [matrix 2]...[matrix m] (formatted like so, {[1,2]|[1,2]} {[3,4]|[3,4]}, where each vector in the matrix is a row) (note: only works on real number matrices)',
    aliases: ['mp'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length < 2) {
                return message.channel.send("Error: not enough matrices. At least 2 matrices needed.");
            }
            const x = helper.mult(args);
            message.channel.send(`Multiplying the set of matrices gives us ${helper.str(x)}`);
        } catch (e) {
            if (/^Error: $/.test(e)) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error. If the problem persists, please open an issue on our GitHub: https://github.com/chel-mico/CSBless/issues");
            }
        }
	},
};