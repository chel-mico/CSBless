module.exports = {
	name: 'github',
    category: 'Other Commands',
    description: 'Command to send the GitHub link for this bot.',
    aliases: ['g', 'git'],
	execute(message, args) {
        message.channel.send("GitHub: https://github.com/chel-mico/CSBless");
	},
};