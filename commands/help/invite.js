const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Sends the bot invitation link.'),
  async execute(interaction) {
    const clientId = interaction.client.user.id;
    const inviteLink = `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=8&scope=bot%20applications.commands`;

    const embed = new EmbedBuilder()
      .setTitle('📩 Invite bot')
      .setDescription(`[Click here to invite the bot to your server](${inviteLink})`)
      .setColor('#0099FF');

    await interaction.reply({ embeds: [embed], flags: 64 });
  },
};
