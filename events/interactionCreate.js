const { log } = require('../index.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
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
    },
};
