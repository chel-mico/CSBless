const path = require('path');
const {prefix} = require(path.join("/CSBless", "config.json"));
const {MessageEmbed} = require('discord.js');

module.exports = {
	name: 'help',
    aliases: ['h'],
	description: 'A command to display all commands.',
    usage: 'no args for all commands or ?help [command name] for a specific command.',
	execute(message, args) {
        const embed = new MessageEmbed() //message to be sent
        embed.setColor(0x5436c9); //set side colour to purple
		let data = '';
        const {commands} = message.client;

        if (!args.length) {
            embed.setTitle("Commands");
            data += commands.map(command => command.name).join('\n');
            data += `\nDo\`${prefix}help [command name]\` to get the usage for that command.`;
        } else {
            const name = args[0].toLowerCase();
            embed.setTitle(name);
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if (!command) {
	           return message.channel.send('Command does not exist.');
            }

            if (command.description) data += `**Description:** ${command.description}\n`;
            if (command.aliases) {
                if (command.usage) data += `**Aliases: **`;
                for (let i = 0; i < command.aliases.length-1; i++) {
                    data += `${prefix}${command.name}, `
                }
                data += `${prefix}${command.name}\n`
            }
            if (command.usage) data += `**Usage:** ${prefix}${command.name} ${command.usage}\n`;
            if (command.permissions) data += `**Permissions:** ${command.permissions}\n`;
            if (command.guildOnly) data += `**Server Only:** ${command.guildOnly}\n`;
            data += `**Cooldown:** ${command.cooldown || 1} second(s)`;
        }

        embed.setDescription(data)
        message.channel.send(embed);
	},
};