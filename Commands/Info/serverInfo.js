const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "serverinfo",
	description: "Displays the server information.",
	usage: "/serverinfo",
	cooldown: 10000,
	/**
     * @param {CommandInteraction} interaction
     */
	execute(interaction) {
		const { guild } = interaction;
		const { description, createdTimestamp, ownerId, members, memberCount, channels, emojis } = guild;

		const Embed = new MessageEmbed()
			.setColor("BLUE")
			.setAuthor(guild.name, guild.iconURL({ dynamic: true }))
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addFields(
				{
					name: "GENERAL", value:
					`
					Name: ${guild.name}
					Created: <t:${parseInt(createdTimestamp / 1000)}:R>
					Owner: <@${ownerId}>

					Description: ${description || "None"}
					`, inline: true
				},
				{
					name: "USERS", value:
					`
					Total: ${memberCount}
					- Members: ${members.cache.filter((m) => !m.user.bot).size}
					- Bots: ${members.cache.filter((m) => m.user.bot).size}
					`, inline: true
				},
				{
					name: "CHANNELS", value:
					`
					Total: ${channels.cache.size}
					- Text: ${channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
					- Voice: ${channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
					- Threads: ${channels.cache.filter((c) => c.type === "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD" && "GUILD_NEWS_THREAD").size}
					- Categories: ${channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
					- Stages: ${channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}
					- News: ${channels.cache.filter((c) => c.type === "GUILD_NEWS").size}
					`, inline: true
				},
				{
					name: "EMOJIS", value:
					`
					Total: ${emojis.cache.size + guild.stickers.cache.size}
					- Animated: ${emojis.cache.filter((e) => e.animated).size}
					- Static: ${emojis.cache.filter((e) => !e.animated).size}
					- Stickers: ${guild.stickers.cache.size}
					`, inline: true
				},
				{
					name: "ROLES", value:
					`
					Total: ${guild.roles.cache.size}
					- Hoisted: ${guild.roles.cache.filter((r) => r.hoist).size}
					- Non-Hoisted: ${guild.roles.cache.filter((r) => !r.hoist).size}
					`, inline: true
				},
				{
					name: "NITRO STATISTICS", value:
					`
					- Tier: ${guild.premiumTier.replace("TIER_", "")}
					- Boosts: ${guild.premiumSubscriptionCount}
					- Boosters: ${members.cache.filter((m) => m.premiumSince).size}
					`, inline: true
				},
			)
			.setFooter(`Last Checked:`).setTimestamp();

		interaction.reply({ embeds: [Embed] });
	},
};