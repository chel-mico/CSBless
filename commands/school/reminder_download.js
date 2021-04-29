const {MessageAttachment, DiscordAPIError, MessageEmbed} = require('discord.js');
const fs = require('fs');
const path = require('path');
const https = require('https');

module.exports = {
	name: 'reminder_download',
    category: 'School Related Commands',
    description: 'Command to download reminder files (.txt).',
    usage: '[class code] (format for class code is [subject code][class number], ex "math1600", "cs1027")',
    aliases: ['rd', 'download'],
    args: true,
    guildOnly: true,
	execute(message, args) {
        try { //tries to access the specific class
            const name = args[0];
            const buffer = fs.readFileSync(path.resolve(process.cwd(), "./classes/" + name + '.txt')); //grab the buffer from the reminder file, assuming it exists
            const attachment = new MessageAttachment(buffer, name + '.txt'); //creates a new attachment with the file
            message.channel.send(`${name} reminder file:`, attachment);
        } catch { //catches if the class doesn't have a reminder file
            //reads the folder of available classes
            message.channel.send("Error: Class does not have a reminder.");
            message.channel.send("Here's a list of classes:")
            const files = fs.readdirSync(path.resolve(process.cwd(), "./classes"));
            let data = "";
            for (i in files) {
                data += files[i].slice(0,-4).toUpperCase() + '\n'; //sinces extension from each file and adds them to data
            }

            //creates embed of classes to send
            const embed = new MessageEmbed() //message to be sent
            embed.setTitle("Classes");
            embed.setDescription(data);
            message.channel.send(embed);
        }
	},
};