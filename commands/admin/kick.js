const { SlashCommandBuilder } = require('discord.js');
const config = require('../../data/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a member from the server.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(false)
    ),
  async execute(interaction) {
    if (interaction.user.id !== config.moderator) {
      return interaction.reply({ content: '❌ You are not authorized to use this command.', flags: 64 });
    }

    const member = interaction.options.getMember('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!member.kickable) {
      return interaction.reply({ content: '⚠️ I cannot kick this user.', flags: 64 });
    }

    await member.kick(reason);
    await interaction.reply(`👢 ${member.user.tag} has been kicked. Reason: ${reason}`);
  },
};
