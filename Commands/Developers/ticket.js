const {
    MessageEmbed,
    CommandInteraction,
    MessageActionRow,
    MessageButton,
} = require('discord.js');
const {
    ticketCategory,
    ticketChannel,
    ticketTranscriptChannel,
} = require('../../Structures/config.json');

module.exports = {
    name: 'ticket',
    description: 'Creates a ticket.',
    usage: '/ticket',
    permissions: ['ADMINISTRATOR'],
    devsOnly: true,
    cooldown: 10000,
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild } = interaction;

        const Embed = new MessageEmbed()
            .setAuthor(
                guild.name + '| Ticketing System',
                guild.iconURL({ dynamic: true })
            )
            .setDescription(
                'Open a ticket to discuss any of the issues with the staff.'
            )
            .setColor('BLURPLE');

        const Buttons = new MessageActionRow();
        Buttons.addComponents(
            new MessageButton()
                .setCustomId('player')
                .setLabel('Player Report')
                .setStyle('PRIMARY')
                .setEmoji('🚹'),
            new MessageButton()
                .setCustomId('bug')
                .setLabel('Bug Report')
                .setStyle('PRIMARY')
                .setEmoji('🐛'),
            new MessageButton()
                .setCustomId('other')
                .setLabel('Other Report')
                .setStyle('SECONDARY')
                .setEmoji('💠')
        );

        await guild.channels.cache
            .get(ticketChannel)
            .send({ embeds: [Embed], components: [Buttons] });

        interaction.reply({ content: 'Ticket created !', ephemeral: true });
    },
};
