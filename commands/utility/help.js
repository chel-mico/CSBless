const path = require('path');
const {prefix} = require(path.join("/CSBless", "config.json"));

module.exports = {
	name: 'help',
    aliases: ['h'],
	description: 'A command to display all commands.',
    usage: 'no args for all commands or ?help [command name] for a specific command.',
	execute(message, args) {
		const data = [];
        const {commands} = message.client;

        if (!args.length) {
            data.push('Commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nDo\`${prefix}help [command name]\` to get the usage for that command`);
        } else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if (!command) {
	           return message.reply('that\'s not a valid command!');
            }
            data.push(`**Name:** ${command.name}`);
            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
            data.push(`**Cooldown:** ${command.cooldown || 1} second(s)`);
        }

        message.channel.send(data, {split: true});
	},
};