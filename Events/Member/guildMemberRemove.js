const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
	name: "guildMemberRemove",
	/**
     * @param {GuildMember} member
     */
	execute(member) {
		const { user, guild } = member;

		const welcome = new MessageEmbed()
			.setColor("AQUA")
			.setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
			.setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
			.setDescription(`Goodbye ${member} has left the **${guild.name}**!
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>`)
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