const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('example') // command name
        .setDescription('An example of a simple order.'), // command description
    async execute(interaction) {
        await interaction.reply('This is an answer to the /example command !'); // bot response
    },
};
