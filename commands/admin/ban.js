const { SlashCommandBuilder } = require('discord.js');
const config = require('../../data/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a member from the server.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false)
    ),
  async execute(interaction) {
    if (interaction.user.id !== config.moderator) {
      return interaction.reply({ content: '❌ You are not authorized to use this command.', flags: 64 });
    }

    const user = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    await interaction.guild.members.ban(user.id, { reason });
    await interaction.reply(`🔨 ${user.tag} has been banned. Reason: ${reason}`);
  },
};
