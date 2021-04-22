const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const {token, prefix} = require('./config.json');

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const folders = fs.readdirSync('./commands');
for (const folder of folders) {
	const files = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of files) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
	//base requirements (is a command, command exists, etc.)
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	//for server only commands
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	//for admin commands
	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	//for commands with arguments
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	//spam proofing
	const {cooldowns} = client;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const timeNow = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownTime = (command.cooldown || 1) * 1000;
	if (timestamps.has(message.author.id)) {
		const expiration = timestamps.get(message.author.id) + cooldownTime;
		if (timeNow < expiration) {
			const timeLeft = (expiration - now) / 1000;
			return message.reply(`${timeLeft.toFixed(1)} more second(s) until you can use \`${prefix}${command.name}\`.`);
		}
	}
	timestamps.set(message.author.id, timeNow);
	setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

	//actual command execution
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);