const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('example-embed')
        .setDescription('Sends a message with an embed!'),

    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor("#0099FF") // embed color
            .setTitle('Example Embed') // command name
            .setURL('https://discord.js.org/')
            .setDescription('This is an example of an embed sent by your bot!')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png') // embed icon
            .addFields(
                { name: 'Field 1', value: 'Value 1', inline: true },
                { name: 'Field 2', value: 'Value 2', inline: true },
            )
            .setTimestamp()
            .setFooter({ text: 'Example Footer', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        await interaction.reply({ embeds: [exampleEmbed] });
    },
};
