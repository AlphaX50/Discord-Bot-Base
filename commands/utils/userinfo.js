const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Displays user info.')
    .addUserOption(option =>
      option.setName('user').setDescription('The target member').setRequired(false)),
  async execute(interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);

    const embed = new EmbedBuilder()
      .setTitle(`News from ${user.tag}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'ID', value: user.id, inline: true },
        { name: 'Created on', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:D>`, inline: true },
        { name: 'Joined the', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:D>`, inline: true }
      )
      .setColor('#0099FF');

    await interaction.reply({ embeds: [embed] });
  },
};
