const helper = require('D:/CSBless/helpers/linalg.js');

module.exports = {
	name: 'dot_product',
    description: 'Takes the dot product of two given vectors',
    usage: '[vector 1] [vector 2] (formatted as so, [1,2,3], [4,5,6]) (note: only works on real number vectors)',
    aliases: ['dp', 'dot'],
    args: true,
    cooldown: 3,
	execute(message, args) {
        try {
            const {v1, v2, x} = helper.dp(args[0], args[1]);
            message.channel.send(`The dot product of ${v1} and ${v2} is ${x}`);
        } catch (e) {
            if (e) {
                message.channel.send(e.toString());
            } else {
                message.channel.send("Unspecified error.");
            }
        }
	},
};