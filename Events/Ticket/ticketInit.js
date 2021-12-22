const {
    ButtonInteraction,
    MessageActionRow,
    MessageEmbed,
    MessageButton,
} = require('discord.js');
const DB = require('../../Structures/Schemas/Ticket');
const { ticketCategory } = require('../../Structures/config.json');

module.exports = {
    name: 'interactionCreate',
    /**
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        const { guild, member, customId } = interaction;

        if (!['player', 'bug', 'other'].includes(customId)) return;

        const ID = Math.floor(Math.random() * 90000) + 10000;

        await guild.channels
            .create(
                `ticket-${customId + `-${interaction.user.username}-` + ID}`,
                {
                    type: 'GUILD_TEXT',
                    parent: ticketCategory,
                    permissionOverwrites: [
                        {
                            id: member.id,
                            allow: [
                                'SEND_MESSAGES',
                                'VIEW_CHANNEL',
                                'READ_MESSAGE_HISTORY',
                            ],
                        },
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [
                                'VIEW_CHANNEL',
                                'SEND_MESSAGES',
                                'READ_MESSAGE_HISTORY',
                            ],
                        },
                    ],
                }
            )
            .then(async (channel) => {
                await DB.create({
                    GuildID: guild.id,
                    MemberID: member.id,
                    TicketID: ID,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Type: customId,
                });

                const Embed = new MessageEmbed()
                    .setAuthor(
                        `${guild.name} | Ticket: ${ID}`,
                        member.user.displayAvatarURL({ dynamic: true })
                    )
                    .setDescription(
                        `Hello there, \n The staff will be here as soon as possible  meanwhile tell us about your issue!\nThank You!`
                    )
                    .setFooter(`The buttons below are STAFF ONLY`);

                const Buttons = new MessageActionRow();
                Buttons.addComponents(
                    new MessageButton()
                        .setCustomId('close')
                        .setLabel('Save & Close Ticket')
                        .setStyle('PRIMARY')
                        .setEmoji('💾'),
                    new MessageButton()
                        .setCustomId('lock')
                        .setLabel('Lock')
                        .setStyle('SECONDARY')
                        .setEmoji('🔒'),
                    new MessageButton()
                        .setCustomId('unlock')
                        .setLabel('Unlock')
                        .setStyle('SECONDARY')
                        .setEmoji('🔓')
                );

                channel.send({
                    embeds: [Embed],
                    components: [Buttons],
                });

                channel
                    .send({
                        content: `${member} here is your ticket`,
                    })
                    .then((m) => {
                        setTimeout(() => {
                            m.delete().catch(() => {});
                        }, 5 * 1000);
                    });

                interaction.reply({
                    content: `${member} your ticket has been created: ${channel}`,
                    ephemeral: true,
                });
            });
    },
};
