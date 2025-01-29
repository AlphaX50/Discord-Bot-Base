const { log } = require('../index.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
            const options = interaction.options.data.map(opt => 
                `- ${opt.name}: ${opt.value || "No value"}`
            ).join("\n");

            log("DEBUG", `Command executed: "${interaction.commandName}" by "${interaction.user.tag}" in "${interaction.channel?.name || "DM"}"`, options || "No options provided.");

        try {
            await command.execute(interaction);
        } catch (error) {
            log('ERROR', `Error executing command: "${interaction.commandName}" by "${interaction.user.tag}" - ${error.message}`);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};