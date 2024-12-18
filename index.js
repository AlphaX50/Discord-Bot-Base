const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const { loadConfig, getTimestamp, writeLogToFile } = require('./utils');
const config = loadConfig();

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});
client.commands = new Collection();

const log = (type, message) => {
    const types = {
        INFO: '\x1b[34mINFO\x1b[0m', // Blue
        SUCCESS: '\x1b[32mSUCCESS\x1b[0m', // Green
        ERROR: '\x1b[31mERROR\x1b[0m', // Red
        DEBUG: '\x1b[35mDEBUG\x1b[0m', // Purple
    };

    const logMessage = `${getTimestamp()} ${types[type]}: ${message}`;

    if (config.debug) {
        console.log(logMessage);
        writeLogToFile(logMessage);
    } else if (type !== 'DEBUG') {
        console.log(`${types[type]}: ${message}`);
    }
};

log('INFO', 'Loading commands...');
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        log('SUCCESS', `Command loaded: ${command.data.name}`);
    }
}

// log('INFO', 'Loading events...');                                                                //
// const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));              //
// for (const file of eventFiles) {                                                                 // 
//     const event = require(`./events/${file}`);                                                   // BUG
//     client.on(event.name, (...args) => event.execute(...args));                                  //
//     log('SUCCESS', `Event loaded: ${file.replace('.js', '')}`);                                  //
// }

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        log('DEBUG', `Unknown command: ${interaction.commandName} by ${interaction.user.tag} in ${interaction.guild?.name || 'DM'}`);
        return;
    }

    try {
        await command.execute(interaction);
        log('DEBUG', `Command executed: "${interaction.commandName}" by "${interaction.user.tag}" in "${interaction.guild?.name || 'DM'}"`);
    } catch (error) {
        log('ERROR', `Error executing command: "${interaction.commandName}" by "${interaction.user.tag}" - ${error.message}`);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(config.token)
    .then(() => {
        log('SUCCESS', `Bot successfully logged in as ${client.user.tag}`);
    })
    .catch(err => {
        log('ERROR', `Failed to login: ${err.message}`);
    });
