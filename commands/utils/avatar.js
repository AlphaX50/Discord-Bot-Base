const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Shows a user\'s avatar.')
    .addUserOption(option =>
      option.setName('user').setDescription('Choose a user').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    const embed = new EmbedBuilder()
      .setTitle(`Avatar of ${user.tag}`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor('#0099FF');

    await interaction.reply({ embeds: [embed] });
  },
};
