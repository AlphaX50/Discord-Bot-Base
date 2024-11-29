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

const getTimestamp = () => {
    const now = new Date();
    return `[${now.toISOString().replace('T', ' ').split('.')[0]}]`;
};

const writeLogToFile = (message) => {
    const logMessage = `${getTimestamp()} ${message}\n`;
    fs.appendFileSync('./bot.log', logMessage, 'utf8');
};

function saveJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 4));  
}

module.exports = { loadConfig, loadJSON, saveJSON, getTimestamp, writeLogToFile };
