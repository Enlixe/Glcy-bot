const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "changelog",
    description: "Shows the latest changes in the bot.",
    usage: "/changelog",
    cooldown: 5000,
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { member } = interaction;

        const bVersion = "1.3.1";

        const embed = new MessageEmbed()
            .setTitle("📜 Change Log for " + client.user.username)
            .setDescription("The latest changes in the bot.")
            .setColor(0x00ff00)
            .setDescription(`Current **Bot Version**: __${bVersion}__`)
            .addFields(
                {name: `1.3.1`, value: `
                    - Apply cooldown to all commands.
                    - Apply usage to all commands.
                    - Clean up entire codebase.
                `},
                {name: `1.3.0`, value: `
                    - Fixed \`NSFW\`, \`Anime\`, \`Image\` command.
                    - Added \`Cooldowns\`
                    - Added \`Developer Only\`
                    - Added \`Maintenance Mode\`
                `},
                {name: `1.2.3`, value: "- Added a new commands: \`NSFW\`", inline: false},
                {name: `1.2.2`, value: "- Added a new commands: \`Anime\`", inline: false},
                {name: `1.2.1`, value: "- Added a new commands: \`Image\`", inline: false},
                {name: `1.2.0`, value: "- Added a new system: \`Music\`", inline: false},
            )
            .setFooter(`Requested by ${member.displayName}`, member.user.displayAvatarURL())
            .setTimestamp();

            interaction.reply({embeds: [embed], ephemeral: false});
    }
}