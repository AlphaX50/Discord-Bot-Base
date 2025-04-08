const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Displays bot latency.'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: '⏳ Calculate...', fetchReply: true });

    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiPing = interaction.client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle('🏓 Pong !')
      .setDescription(`> **Message latency :** \`${latency}ms\`\n> **Ping API WebSocket :** \`${apiPing}ms\``)
      .setColor('#0099FF')
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.editReply({ content: null, embeds: [embed] });
  },
};
