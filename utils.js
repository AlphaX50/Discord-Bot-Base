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

function saveJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 4));
}

module.exports = { loadConfig, loadJSON, saveJSON };
