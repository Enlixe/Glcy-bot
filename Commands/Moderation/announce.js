const { CommandInteraction, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    name: "announce",
    description: "Announces whatever you want to announce in the announcement channel.",
    usage: "/announce <message>",
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
    cooldown: 10000,
    options: [
        {
            name: "channel",
            description: "The channel to send the giveaway to",
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT", "GUILD_NEWS"],
            required: true,
        },
        {
            name: "title",
            description: "Provide the title of what you want to announce.",
            type: "STRING",
            required: true
        },
        {
            name: "information",
            description: "Provide the information that you want to announce.",
            type: "STRING",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction) {
        
        interaction.reply({content: "Sending announcement..."})

        const announcer = interaction.options.getChannel("channel");
        const title = interaction.options.getString("title");
        const info = interaction.options.getString("information");

        const announcement = new MessageEmbed()
        .setTitle(`${title}`)
        .setColor("GREEN")
        .setDescription(`${info}`)
        .setTimestamp()

        announcer.send({embeds: [announcement]})

    }
}