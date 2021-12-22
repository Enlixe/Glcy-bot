// eslint-disable-next-line no-unused-vars
const { MessageEmbed, ContextMenuInteraction } = require("discord.js");

module.exports = {
	name: "UserInfo",
	type: "USER",
	hidden: true,
	context: true,
	/**
     * @param {ContextMenuInteraction} interaction
     */
	async execute(interaction) {
		const target = await interaction.guild.members.fetch(interaction.targetId);

		const response = new MessageEmbed()
			.setColor("AQUA")
			.setAuthor(target.user.tag, target.user.avatarURL({ dynamic: true, size: 512 }))
			.setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
			.addField("ID", `${target.user.id}`, true)
			.addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}`)
			.addField("Member since", `<t:${(parseInt(target.joinedTimestamp) / 1000).toFixed(0)}:R>`, true)
			.addField("Discord User Since", `<t:${(parseInt(target.user.createdTimestamp) / 1000).toFixed(0)}:R>`, true);

		interaction.reply({ embeds: [response], ephemeral:true });
	},
};