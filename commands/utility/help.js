const path = require('path');
const fs = require('fs');
const {prefix} = require(path.join("/CSBless", "config.json"));
const {MessageEmbed} = require('discord.js');

module.exports = {
	name: 'help',
    category: 'Other Commands',
    aliases: ['h'],
	description: 'A command to display all commands.',
    usage: 'no args for all commands or ?help [command name] for a specific command.',
	execute(message, args) {
        const embed = new MessageEmbed() //message to be sent
        embed.setColor(0x5436c9); //set side colour to purple
		let data = '';
        const {commands} = message.client;

        let current_category = "";
        function help_map(command) {
            if (current_category !== command.category) {
                current_category = command.category;
                return `\n**${current_category}**\n${command.name}`;
            }
            return command.name;
        }

        if (!args.length) {
            embed.setTitle("Commands");
            data += commands.map(help_map).join('\n');
            data += `\n\nDo \`${prefix}help [command name]\` to get the usage for that command.`;
            console.log(data);
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