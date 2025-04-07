const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { loadConfig } = require('./utils');
const { log } = require('./index');
const config = loadConfig();

console.log('-----------------------------------------------------');
log('INFO', 'Initialize deployment of slash commands...');

const commands = [];
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
       log('INFO', 'Started refreshing application (/) commands.');
       log('SUCCESS', 'Successfully reloaded application (/) commands.');

        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands },
        );

        console.log('-----------------------------------------------------');
    } catch (error) {
        log('ERROR', error);
    }
})();