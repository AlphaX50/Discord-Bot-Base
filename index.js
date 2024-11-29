const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const { loadConfig } = require('./utils');
const config = loadConfig();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const getTimestamp = () => {
    const now = new Date();
    return `[${now.toISOString().replace('T', ' ').split('.')[0]}]`;
};

const log = (type, message) => {
    const types = {
        INFO: '\x1b[34mINFO\x1b[0m', // Blue
        SUCCESS: '\x1b[32mSUCCESS\x1b[0m', // Green
        ERROR: '\x1b[31mERROR\x1b[0m', // Red
    };
    console.log(`${getTimestamp()} ${types[type]}: ${message}`);
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

log('INFO', 'Loading events...');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    log('SUCCESS', `Event loaded: ${file.replace('.js', '')}`);
}

client.login(config.token)
    .then(() => {
        log('SUCCESS', `Bot successfully logged in as ${client.user.tag}`);
    })
    .catch(err => {
        log('ERROR', `Failed to login: ${err.message}`);
    });
