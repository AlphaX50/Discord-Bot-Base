const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../data/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears messages in the current channel.')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to delete (max 100)')
        .setRequired(true)
    ),
  async execute(interaction) {
    if (interaction.user.id !== config.moderator) {
      return interaction.reply({ content: '❌ You are not authorized to use this command.', flags: 64});
    }

    const amount = interaction.options.getInteger('amount');
    if (amount > 100 || amount < 1) {
      return interaction.reply({ content: '⚠️ Amount must be between 1 and 100.', flags: 64 });
    }

    await interaction.channel.bulkDelete(amount, true);
    await interaction.reply({ content: `🧹 Deleted ${amount} messages.`, flags: 64 });
  },
};
