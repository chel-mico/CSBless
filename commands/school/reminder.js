const {MessageEmbed} = require("discord.js");
const readLine = require('readline');
const fs = require('fs');
const path = require('path');

module.exports = {
	name: 'reminder',
    category: 'School Related Commands',
    description: 'Command to send reminders for either all CS-related classes or a specific class.',
    usage: 'no args for a general reminder or ?reminder [class code] for a specific class (format is [subject code][class number], ex "math1600", "cs1027")',
    aliases: ['r'],
    guildOnly: true,
	execute(message, args) {
        const embed = new MessageEmbed() //message to be sent
        embed.setColor(0x5436c9); //set side colour to purple
        if (!args.length) { //sends all files
            let data = ""
            const files = fs.readdirSync(path.resolve(process.cwd(), "./classes"));
            for (i = 0; i < files.length; i++) { //adding text data from all class files to data
                data += files[i].slice(0,-4).toUpperCase() + '\n\n';
                data += fs.readFileSync(path.resolve(process.cwd(), "./classes/" + files[i]), 'utf8').toString();
            }
            embed.setTitle('Reminders');
            embed.setDescription(data);
        } else { //sends given class
            let data = "";
            try { //tries to access the specific class
                const name = args[0];
                data = fs.readFileSync(path.resolve(process.cwd(), "./classes/" + name + '.txt'), 'utf8').toString();
                embed.setTitle(name.toUpperCase());
            } catch { //catches if the class doesn't have a reminder file
                message.channel.send("Error: Class does not have a reminder.");
                message.channel.send("Here's a list of classes:")
                const files = fs.readdirSync(path.resolve(process.cwd(), "./classes"));
                for (i in files) {
                    data += files[i].slice(0,-4).toUpperCase() + '\n';
                }
            } finally {
                embed.setDescription(data);
            }
        }
        message.channel.send({embeds: [embed]});
	},
};