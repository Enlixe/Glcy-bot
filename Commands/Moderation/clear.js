const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    description:
        'Deletes a specified number of messages from a channel or a target.',
    usage: '/clear <amount> [user]',
    permissions: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
    cooldown: 10000,
    options: [
        {
            name: 'amount',
            description:
                'Select the amount of messages to delete from a channel or a target',
            type: 'NUMBER',
            required: true,
        },
        {
            name: 'target',
            description: 'Select a target to clear their messages.',
            type: 'USER',
            required: false,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const amount = options.getNumber('amount');
        const target = options.getMember('target');

        const messages = (await channel.messages.fetch()).filter(
            (msg) => !msg.pinned
        );

        const response = new MessageEmbed().setColor('LUMINOUS_VIVID_PINK');

        if (amount > 100) {
            response.setDescription(`⛔ Cannot delete over 100 messages`);
            return interaction.reply({ embeds: [response], ephemeral: true });
        }

        if (target) {
            let i = 0;
            const filtered = [];
            (await messages).filter((m) => {
                if (m.author.id === target.id && amount > i) {
                    filtered.push(m);
                    i++;
                }
            });

            await channel.bulkDelete(filtered, true).then((msg) => {
                response.setDescription(
                    `🧹 Cleared ${msg.size} from ${target}`
                );
                interaction.reply({ embeds: [response] });
            });
        } else {
            const msgToDelete = (
                await channel.messages.fetch({ limit: amount })
            ).filter((msg) => !msg.pinned);

            await channel.bulkDelete(msgToDelete, true).then((msg) => {
                response.setDescription(
                    `🧹 Cleared ${msg.size} from this channel`
                );
                interaction.reply({ embeds: [response] });
            });
        }
    },
};
