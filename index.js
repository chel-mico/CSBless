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
	const checker = /\s+(?=[^{\}]*\})|\s+(?=[^[\]]*\])/g; //matches whitespace within {} and []
	const args = message.content.slice(prefix.length).trim().replace(checker, "").split(/ +/); //splits args and replaces whitespace within {} and []
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	//for server only commands
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.channel.send('Error: command is only executable inside a server.');
	}

	//for admin commands
	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			if (command.permissions === "BAN_MEMBERS") {
				return message.channel.send('Error: you do not have permission to use this command. Admin needed.');
			}
			const perms = command.permissions;
			return message.channel.send(`Error: you do not have permission to use this command. ${perms.chatAt(o) + name.slice(1).toLowerCase()} or administator needed.`);
		}
	}

	//for commands with arguments
	if (command.args && !args.length) {
		let reply = "Error: no arguments provided.";
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
			const timeLeft = (expiration - timeNow) / 1000;
			return message.reply(`${timeLeft.toFixed(1)} more second(s) until you can use \`${prefix}${command.name}\`.`);
		}
	}
	timestamps.set(message.author.id, timeNow);
	setTimeout(() => timestamps.delete(message.author.id), cooldownTime);

	//argument overload proofing to keep the bot from lagging too much
	const maxArgs = 100;
	const maxArgLength = 5000;
	if (args.length > maxArgs) {
		return message.reply(`Error: too many arguments. Maximum number of arguments is ${maxArgs}.`);
	}
	for (let i = 0; i < args.length; i++) {
		if (args[i].length > maxArgLength) {
			return message.reply(`Error: one or more arguments are too long. Maximum length is ${maxArgLength} characters per argument.`);
		}
	}

	//actual command execution
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.channel.send('Unexpected error: please open an issue on the GitHub if the problem persists. https://github.com/chel-mico/CSBless/issues');
	}
});

client.login(token);