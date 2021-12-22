const { ButtonInteraction, MessageEmbed } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const { ticketTranscriptChannel } = require('../../Structures/config.json');
const DB = require('../../Structures/Schemas/Ticket');

module.exports = {
    name: 'interactionCreate',
    /**
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if (!interaction.isButton()) return;
        const { guild, member, customId, channel } = interaction;
        if (!['close', 'lock', 'unlock'].includes(customId)) return;
        if (!member.permissions.has('ADMINISTRATOR'))
            return interaction.reply({
                content: 'You do not have permission to do that.',
                ephemeral: true,
            });

        const Embed = new MessageEmbed().setColor('BLURPLE');

        DB.findOne({ ChannelID: channel.id }, async (err, docs) => {
            if (err) throw err;
            if (!docs)
                return interaction.reply({
                    content:
                        'This ticket does not exist, please delete manually.',
                    ephemeral: true,
                });
            switch (customId) {
                case 'lock':
                    if (docs.Locked === true)
                        return interaction.reply({
                            content: 'This ticket is already locked.',
                            ephemeral: true,
                        });
                    await DB.updateOne(
                        { ChannelID: channel.id },
                        { Locked: true }
                    );
                    Embed.setDescription(
                        '🔒 | This ticket has been locked for reviewing.'
                    );
                    channel.permissionOverwrites.edit(docs.MemberID, {
                        SEND_MESSAGES: false,
                    });
                    interaction.reply({ embeds: [Embed] });
                    break;

                case 'unlock':
                    if (docs.Locked === false)
                        return interaction.reply({
                            content: 'This ticket is already unlocked.',
                            ephemeral: true,
                        });
                    await DB.updateOne(
                        { ChannelID: channel.id },
                        { Locked: false }
                    );
                    Embed.setDescription('🔓 | This ticket has been unlocked.');
                    channel.permissionOverwrites.edit(docs.MemberID, {
                        SEND_MESSAGES: true,
                    });
                    interaction.reply({ embeds: [Embed] });
                    break;

                case 'close':
                    if (docs.Closed === true)
                        return interaction.reply({
                            content: `This ticket is already closed, please wait for it to get deleted.`,
                            ephemeral: true,
                        });
                    const attachment = await createTranscript(channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${docs.Type}-${docs.TicketID}-transcript.html`,
                    });
                    await DB.updateOne(
                        { ChannelID: channel.id },
                        { Closed: true }
                    );

                    const Member = guild.members.cache.get(docs.MemberID);
                    const Message = await guild.channels.cache
                        .get(ticketTranscriptChannel)
                        .send({
                            embeds: [
                                Embed.setAuthor(
                                    Member.user.tag,
                                    Member.user.displayAvatarURL({
                                        dynamic: true,
                                    })
                                ).setTitle(
                                    `Transcript Type: ${docs.Type}\nID: ${docs.TicketID}`
                                ),
                            ],
                            files: [attachment],
                        });
                    interaction.reply({
                        embeds: [
                            Embed.setDescription(
                                `💾 | The transcript is now saved [TRANSCRIPT](${Message.url})`
                            ),
                        ],
                    });

                    setTimeout(() => {
                        channel.delete();
                    }, 10 * 1000);
                    break;
            }
        });
    },
};
