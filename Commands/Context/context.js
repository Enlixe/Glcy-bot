const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "context",
	description: "Context helper commands",
	usage: "/context",
	cooldown: 10000,
	/**
     * @param {CommandInteraction} interaction
     */
	execute(interaction) {
		const embed = new MessageEmbed()
			.setAuthor("Context", interaction.client.user.displayAvatarURL())
			.setColor("BLUE")
			.setDescription(`
				Context is a helper command that allows you
				to get information about the current user.

				Just right click the user you want to get information about and select "Apps".
			`)
			.setTimestamp();
		interaction.reply({ embeds: [embed], ephemeral: true });
	},
};