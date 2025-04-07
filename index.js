const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const { loadConfig, getTimestamp, writeLogToFile } = require('./utils');
const config = loadConfig();

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});
client.commands = new Collection();

const log = (type, message, data = null) => {
    const types = {
        INFO: '\x1b[34mINFO\x1b[0m', // Blue
        SUCCESS: '\x1b[32mSUCCESS\x1b[0m', // Green
        ERROR: '\x1b[31mERROR\x1b[0m', // Red
        DEBUG: '\x1b[35mDEBUG\x1b[0m', // Purple
    };

    const timestamp = getTimestamp();
    let logMessage = `${timestamp} ${types[type]}: ${message}`;

    if (data) {
        if (typeof data === "object") {
            logMessage += `\n📌 Data: ${formatOptions(data)}`;
        } else {
            logMessage += ` | 📌 ${data}`;
        }
    }

    if (config.debug) {
        console.log(logMessage);
        writeLogToFile(logMessage);
    } else if (type !== "DEBUG") {
        console.log(logMessage);
    }
};

module.exports = { log };

console.log('                   \x1b[35mStarting the Discord bot...\x1b[0m');

console.log('\x1b[34m');
console.log(`
    ██████╗  ██████╗ ████████╗    ██████╗  █████╗ ███████╗███████╗
    ██╔══██╗██╔═══██╗╚══██╔══╝    ██╔══██╗██╔══██╗██╔════╝██╔════╝
    ██████╔╝██║   ██║   ██║       ██████╔╝███████║███████╗█████╗  
    ██╔══██╗██║   ██║   ██║       ██╔══██╗██╔══██║╚════██║██╔══╝  
    ██████╔╝╚██████╔╝   ██║       ██████╔╝██║  ██║███████║███████╗
    ╚═════╝  ╚═════╝    ╚═╝       ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
`);
console.log('\x1b[0m');
console.log('                   ---------------------------');

log('INFO', 'Loading commands...');
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    if (!fs.statSync(`./commands/${folder}`).isDirectory()) continue;
    log('INFO', `Loading commands from folder: ${folder}`);
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        log('SUCCESS', `Command loaded: ${command.data.name}`);
    }
}
console.log('-----------------------------------------------------');
log('INFO', 'Loading events...');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
    log('SUCCESS', `Event loaded: ${file.replace('.js', '')}`);
}

client.login(config.token)
    .then(() => {
        log('SUCCESS', `Bot successfully logged in as ${client.user.tag}`);
    })
    .catch(err => {
        log('ERROR', `Failed to login: ${err.message}`);
    });