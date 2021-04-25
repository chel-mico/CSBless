module.exports = {
	name: 'blessings',
    description: 'Command to send the CS Blessings drive.',
    aliases: ['b'],
	execute(message, args) {
        message.channel.send("CS Blessings drive: https://drive.google.com/drive/u/0/folders/1y-Ui-vRQrWpu-3E-i6CdhpqRWfx2P53c");
	},
};