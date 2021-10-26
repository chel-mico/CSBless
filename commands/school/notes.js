const {MessageEmbed} = require("discord.js");
const readLine = require('readline');
const fs = require('fs');
const path = require('path');
const notes = require('./notes.json');

module.exports = {
	name: 'notes',
    category: 'School Related Commands',
    description: 'Command to send notes for all available classes.',
    usage: '',
    aliases: ['n'],
    guildOnly: true,
	execute(message, args) {
        const embed = new MessageEmbed() //message to be sent
        embed.setColor(0x5436c9); //set side colour to purple
        embed.setTitle('Notes');
        let data = "";
        for (var key in notes) { //adding text data from notes file to data
            console.log(key);
            data += key + ': ';
            data += notes[key] + "\n\n";
        }
        data += "CS Blessings: https://drive.google.com/drive/u/0/folders/1y-Ui-vRQrWpu-3E-i6CdhpqRWfx2P53c";
        embed.setDescription(data);
        message.channel.send(embed);
	},
};