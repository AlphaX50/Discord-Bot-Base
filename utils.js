const fs = require('fs');

function loadConfig() {
    return JSON.parse(fs.readFileSync('./data/config.json', 'utf8'));
}

function loadJSON(file) {
    if (fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } else {
        return {};
    }
}

const formatOptions = (interaction) => {
    if (!interaction.options || !interaction.options.data.length) return "No options provided.";

    return interaction.options.data.map(opt => 
        `- ${opt.name}: ${opt.value || "No value"}`
    ).join("\n");
};

const getTimestamp = () => {
    const now = new Date();
    const timestamp = now.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }).replace(',', '');
    return `[${timestamp}]`;
};

const writeLogToFile = (message) => {
    const logMessage = `${getTimestamp()} ${message}\n`;
    fs.appendFileSync('./data/bot.log', logMessage, 'utf8');
};

function saveJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 4));  
}

module.exports = { loadConfig, loadJSON, saveJSON, getTimestamp, writeLogToFile, formatOptions };
