const {MessageEmbed} = require("discord.js");
const readLine = require('readline');
const fs = require('fs');
const path = require('path');

module.exports = {
	name: 'reminder',
	description: 'Command to send reminders for either all CS-related classes or a specific class.',
    usage: '!reminder for a general reminder or !reminder [class code] for a specific class (format is [subject code][class number], ex "math1600", "cs1027")',
	execute(message, args) {
        const embed = new MessageEmbed()
        embed.setColor(0x5436c9);
        if (!args.length) {
            let data = ""
            const files = fs.readdirSync('D:/CSBless/classes');
            for (i in files) {
                data += file[i].slice(0,-4).toUpperCase() + '\n\n';
                data += fs.readFileSync(path.resolve('classes', files[i]), 'utf8').toString();
            }
            embed.setTitle('Reminders');
            embed.setDescription(data);
        } else {
            let data = '';
            try {
                const name = args[0];
                data = fs.readFileSync(path.resolve('classes', name + '.txt'), 'utf8').toString();
                embed.setTitle(name.toUpperCase());
            } catch {
                message.channel.send("Error: Class does not exist!");
                message.channel.send("Here's a list of classes:")
                const files = fs.readdirSync('D:/CSBless/classes');
                for (i in files) {
                    data += files[i].slice(0,-4).toUpperCase() + '\n';
                }
            } finally {
                embed.setDescription(data);
            }
        }
        message.channel.send(embed);
	},
};