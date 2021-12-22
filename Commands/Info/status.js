const { MessageEmbed } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
	name: "status",
	description: "Displays the status of the client and the database connection",
	usage: "/status",
	cooldown: 10000,
	/**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
	execute(interaction, client) {
		const response = new MessageEmbed()
			.setColor("AQUA")
			.setAuthor(client.user.username, client.user.avatarURL())
			.setDescription(`
				**Client**: \`🟢 ONLINE\` - \`${client.ws.ping}ms\`
				**» Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>
				**» Memory Usage**: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`

				**Database**: \`${switchTo(connection.readyState)}\`

				**Tools**: \n - **Node.js**: \`${process.version}\`\n - **Discord.js**: \`${require("discord.js").version}\`\n - **Mongoose**: \`${require("mongoose").version}\`\n
			`)
			.addField("**Commands**", `\`${client.commands.size}\` commands loaded.`, true)
			.addField("**Guilds**", `\`${client.guilds.cache.size}\` guilds connected.`, true)
			.addField("**Users**", `\`${client.users.cache.size}\` users connected.`, true)
			.setTimestamp();

		interaction.reply({ embeds: [response] });
	},
};

function switchTo(val) {
	let status = " ";
	switch (val) {
	case 0: status = "🔴 DISCONNECTED";
		break;
	case 1: status = "🟢 CONNECTED";
		break;
	case 2: status = "🟠 CONNECTING";
		break;
	case 3: status = "🟣 DISCONNECTING";
		break;
	}
	return status;
}