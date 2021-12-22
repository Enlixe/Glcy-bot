const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
	name: "guildMemberAdd",
	/**
     * @param {GuildMember} member
     */
	execute(member) {
		const { user, guild } = member;

		// Auto Add Role
		// member.roles.add("ROLE ID");

		const welcome = new MessageEmbed()
			.setColor("AQUA")
			.setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
			.setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
			.setDescription(`Welcome ${member} to the **${guild.name}**!
            Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>
            Latest Member Count: **${guild.memberCount}**`)
			.setFooter(`ID: ${user.id}`);

		// Send WEBHOOK
		// https://discord.com/api/webhooks/901018045831594024/_Bjws2otaLQnep96qEldJCh82uMzAWnkAtMzBg0cl7ULS7gh8LjVxO0upF-xVgpU8DP1
		const welcomer = new WebhookClient({
			id: "901018045831594024",
			token: "_Bjws2otaLQnep96qEldJCh82uMzAWnkAtMzBg0cl7ULS7gh8LjVxO0upF-xVgpU8DP1",
		});
		welcomer.send({ embeds: [welcome] });
	},
};