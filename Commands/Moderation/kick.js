const {CommandInteraction, Client} = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'kick a member',
    usage: '/kick <user> [reason]',
    permissions: ['KICK_MEMBERS'],
    cooldown: 10000,
    options: [
        {
            name: 'user',
            description: 'user',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'reason',
            type: 'STRING',
            required: false
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, Discord, send, embed) => {
        if (!interaction.guild.me.permissions.has('KICK_MEMBERS')) return send('I do not have KICK_MEMBERS.')
        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') || 'No reason specified.'
        if (user.roles.highest.position >= interaction.member.roles.highest.position) return send('That user is higher than you or has the same highest role as you.')
        if (user.id === interaction.member.id) return send('You cannot kick yourself.')
        if (user.id === interaction.guild.me.id) return send('I cannot kick myself.')
        if (user.roles.highest.position >= interaction.guild.me.roles.highest.position) return send('That user is higher than me.')
        if (client.owners.includes(user.id)) return send('You cannot kick an owner.')
        // -------------------------------------------------------------------------------------------------
        user.send({content: `You have been kicked from \`${interaction.guild.name}\` for \`${reason}\``}).catch(() => send("I couldn't dm this user. Are their dms off?"))
        user.kick(reason)
        send(`${user.user.tag} was kicked.`)
    }
}
