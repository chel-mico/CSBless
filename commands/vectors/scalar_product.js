const path = require('path');
const helper = require(path.resolve(process.cwd(), "./helpers/vectors.js"));

module.exports = {
	name: 'scalar_product',
    category: 'Vector Operations',
    description: 'Takes the product of a scalar and a vector.',
    usage: '[scalar] [vector 1] (formatted as so, 3 [1,2,3]) (note: only works on real number vectors and scalars)',
    aliases: ['sp', 'scalar'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            if (args.length !== 2) {
                return message.channel.send("Error: wrong number of arguments. One scalar and one vector needed.");
            }
            const x = helper.sp(args[0], args[1]); 
            message.channel.send(`Multiplying ${args[0]} and ${args[1]} gives us [${x.toString()}]`);
        } catch (e) {
            if (/^Error: $/.test(e)) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error. If the problem persists, please open an issue on our GitHub: https://github.com/chel-mico/CSBless/issues");
            }
        }
	},
};