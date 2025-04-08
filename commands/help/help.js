const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays the list of available commands.'),
  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle('📖 Command List')
      .setColor('#0099FF')
      .setDescription('Commands are grouped into categories below.')
      .addFields(
        { name: '🛠️ Utility', value: '`/ping`, `/userinfo`, `/serverinfo`, `/avatar`', inline: false },
        { name: '📚 Info', value: '`/help`, `/setup-info`, `/invite`, `/example`, `/example-embed`', inline: false },
        { name: '🛠️ Admin', value: '`/clear`, `/kick`, `/ban`, `/timeout`', inline: false }
      )

    embed.setFooter({ text: 'Use / to run commands!' });

    await interaction.reply({ embeds: [embed] });
  },
};
