const {MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
	name: "invite",
	description: "Invite me to your server",
	usage: "/invite",
	cooldown: 10000,
	/**
     * @param {CommandInteraction} interaction
     */
	async execute(interaction) {
		const Invite = new MessageEmbed()
			.setTitle("Invite Me!")
			.setDescription("I'm a cool Discord Bot, ain't I? Use the buttons below \nto invite me to your server or join our support server!\n\nStay Safe 👋")
			.setColor("AQUA")

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setURL("https://discord.com/api/oauth2/authorize?client_id=722009574760120353&permissions=305523798&scope=bot")
				.setLabel("Invite Me")
				.setStyle("LINK"),
			new MessageButton()
				.setURL("https://discord.gg/Jt66GWh")
				.setLabel("Support Server")
				.setStyle("LINK"),
		);

		await interaction.reply({ embeds: [Invite], components: [row] });
	},
};