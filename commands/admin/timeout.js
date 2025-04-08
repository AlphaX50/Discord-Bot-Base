const { SlashCommandBuilder } = require('discord.js');
const ms = require('ms');
const config = require('../../data/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Times out a member for a specific duration.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The member to timeout')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('duration')
        .setDescription('Duration (e.g. 1m, 10m, 1h, 1d)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for timeout')
        .setRequired(false)
    ),
  async execute(interaction) {
    if (interaction.user.id !== config.moderator) {
      return interaction.reply({ content: '❌ You are not authorized to use this command.', flags: 64 });
    }

    const member = interaction.options.getMember('target');
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    const msDuration = ms(duration);
    if (!msDuration || msDuration > 2.419e9) {
      return interaction.reply({ content: '⚠️ Invalid duration or exceeds 28 days.', flags: 64 });
    }

    await member.timeout(msDuration, reason);
    await interaction.reply(`⏳ ${member.user.tag} has been timed out for ${duration}. Reason: ${reason}`);
  },
};
