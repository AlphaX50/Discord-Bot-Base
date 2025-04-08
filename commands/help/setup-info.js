const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-info')
    .setDescription('Explains how to configure and host the bot.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('⚙️ Bot configuration guide')
      .setColor('#0099FF')
      .setDescription("Here's a quick guide to getting started with your Discord.js bot:")
      .addFields(
        {
          name: '1. Create your own bot',
          value: 'Go to [Discord Developer Portal](https://discord.com/developers/applications), create an app, add a bot, get the token.',
        },
        {
          name: '2. Modify  le`config.json`',
          value: 'Make sure your bot reads the token and the client ID.',
        },
        {
          name: '3. Hosting',
          value: '- **Local**: with Node.js (node index.js)\n- **Replit** / **Glitch**: for temporary hosting\n- **VPS**: for a real bot 24/7',
        },
        {
          name: '4. Support',
          value: 'Need help? Join a Discord.js FR server or check [the official doc](https://discord.js.org/).',
        },
      )
      .setFooter({ text: 'Bot ready to use 🚀' });

    await interaction.reply({ embeds: [embed] });
  },
};
